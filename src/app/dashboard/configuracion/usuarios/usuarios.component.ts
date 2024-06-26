import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from '../../core/services/usuarios.service';
import { PaginationModel } from '../../core/interfaz/pagination.model';
import { Usuario } from '../../core/models/usuario.model';
import { Servicio } from '../../core/models/servicios.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserModalComponent } from './user-modal/user-modal.component';
import { UserBuyModalComponent } from './user-buy-modal/user-buy-modal.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent {
  limit: number = 10;
  searchTerms: string = '';
  closeResult = '';
  form: FormGroup;
  paginacion: PaginationModel<Usuario> = {
    currentPage: 0,
    total: 0,
    totalPages: 0,
    data: [],
  };
  constructor(
    private usuarioService: UsuariosService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.form = formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      cod_pais: ['', Validators.required],
      telefono: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios(page = 1) {
    this.usuarioService.getPaginacion(page, this.limit).subscribe(
      (response: PaginationModel<Usuario>) => {
        this.paginacion = response;
      },
      (error) => {
        this.toastr.error('Error al cargar los usuarios', error.message);
      }
    );
  }
  public getestado(estado: Number) {
    return estado == 1 ? 'Activo' : 'Inactivo';
  }

  onPageChange(pageNumber: number): void {
    this.cargarUsuarios(pageNumber);
  }
  roundDecimal(value: number): number {
    // console.log("Total "+Math.ceil(value));
    if (value < this.limit) {
      return 1;
    }
    let a = value > 0 ? Math.ceil(value) : value;
    return a;
  }

  serviciosAString(servicios: Servicio[]) {
    const serviciosList = servicios
      .map(
        (servicio) => `<li>
      <div class="row">
        <div class=" col-12 col-md-4">
          ${servicio.nombre}
        </div>
        <div class="col-auto">
          <span class="badge bg-info badge-sm"> Bs ${servicio.monto_por_servicio}</span>
        </div>
      </div>
    </li>`
      )
      .join('');
    // const serviciosList = nombresServicios.map(nombre => `<li>${nombre}</li>`).join('');
    return `<ul class="mb-0">${serviciosList}</ul>`;
  }
  open(isCreating: boolean = true, usuario: Usuario | any = null) {
    const modalRef = this.modalService.open(UserModalComponent);
    modalRef.componentInstance.isCreating = isCreating;
    if (!isCreating) {
      modalRef.componentInstance.usuario = usuario;
    }
    modalRef.result.then(
      (result) => {
        this.toastr.success(result.message);
        this.cargarUsuarios();
      },
      (reason) => {}
    );
  }

  private getDismissReason(reason: any): string {
    this.form.reset();
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // public submitForm(){
  //   if(this.form.valid){
  //     let nombre = this.form.get('nombre')?.value;
  //     let apellidos = this.form.get('apellidos')?.value??"";
  //     this.usuarioService.crearUsuario(nombre,apellidos).then(
  //       (response) => {
  //         this.modalService.dismissAll();
  //         this.toastr.success(response.message);
  //         this.cargarUsuarios();
  //       }
  //     ).catch(error => {
  //       this.toastr.success(error.message);
  //     });
  //   }
  // }

  eliminarUsuario(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService
          .eliminar(id)
          .then((message) => {
            this.toastr.success(message);
            this.cargarUsuarios();
            Swal.fire('', message, 'success');
          })
          .catch((error) => {
            this.toastr.error(error.message);
            Swal.fire('', error.message, 'error');
          });
      }
    });
  }

  verDetalle(usuarioId: number) {
    //como agregar custom style to Swal
    Swal.fire({
      title: '¿Qué detalle desea ver?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Deudas`,
      denyButtonText: `Movimientos`,
      cancelButtonText: `Adelantos $.`,
      icon: 'question',
      customClass: {
        confirmButton: 'btn btn-success btn-sm',
        denyButton: 'btn btn-primary btn-sm',
        cancelButton: 'btn btn-danger btn-sm',
      },
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        // this.router.navigate(['/usuario/detalle-deudas/', usuarioId]);
        this.showDeudasToUser(usuarioId);
      } else if (result.isDenied) {
        // this.router.navigate(['/usuario/detalle-movimientos/', usuarioId]);
        this.showMovementsToUser(usuarioId);
      }else if(result.isDismissed && result.dismiss === Swal.DismissReason.cancel){
        this.showPrepaymentsToUser (usuarioId);
      }
    });
  }

  showModalBuy(usuarioId: number, monto: number) {
    const modalRef = this.modalService.open(UserBuyModalComponent);
    modalRef.componentInstance.montoDebePagar = monto;
    modalRef.componentInstance.usuarioId = usuarioId;
    modalRef.result.then(
      (result) => {
        this.toastr.success(result.message);
        this.cargarUsuarios();
      },
      (reason) => {}
    );
  }

  notifyDeuda(usuarioId: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Notificar sus deudas al usuario.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('', 'Notificacion de las deudas enviada.', 'success');
        this.usuarioService
          .notifyDeuda(usuarioId)
          .then((message) => {
            this.toastr.success(message);
          })
          .catch((error) => {
            this.toastr.error(error);
            Swal.fire(error, '', 'error');
          });
      }
      // else if (result.dismiss === Swal.DismissReason.cancel) {
      //   Swal.fire('Cancelado', 'La acción ha sido cancelada.', 'error');
      // }
    });
  }
  showDeudasToUser(usuarioId: number) {
    this.router.navigate(['/admin/usuario/detalle-deudas/', usuarioId]);
  }

  showMovementsToUser(usuarioId: number) {
    this.router.navigate(['/admin/usuario/detalle-movimientos/', usuarioId]);
  }

  showPrepaymentsToUser(usuarioId: number) {
    this.router.navigate(['/admin/usuario/detalle-adelantos/', usuarioId]);
  }
}
