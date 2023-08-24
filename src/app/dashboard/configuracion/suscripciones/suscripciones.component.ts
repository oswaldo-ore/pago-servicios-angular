import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SuscripcionService } from '../../core/services/suscripcion.service';
import { Suscripcion } from '../../core/models/suscripcion.models';
import { PaginationModel } from '../../core/interfaz/pagination.model';
import { ServiciosService } from '../../core/services/servicios.service';
import { UsuariosService } from '../../core/services/usuarios.service';
import { Servicio } from '../../core/models/servicios.model';
import { Usuario } from '../../core/models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suscripciones',
  templateUrl: './suscripciones.component.html',
  styleUrls: ['./suscripciones.component.css']
})
export class SuscripcionesComponent {
  form: FormGroup;
  closeResult = '';
  searchTerms: string = "";
  limit: number = 8;
  paginacion: PaginationModel<Suscripcion> = {
    currentPage: 0,
    total: 0,
    totalPages: 0,
    data: []
  };

  servicios: Servicio[] = [];
  usuarios: Usuario[] = [];

  serviciosFijo: Servicio[] = [];

  constructor(
    private suscripcionService: SuscripcionService,
    private servicioService: ServiciosService,
    private usuarioService: UsuariosService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.form = formBuilder.group({
      tipo: ['fijo', Validators.required],
      servicio: [0, Validators.required],
      usuario: [0, Validators.required],
      monto: [0, Validators.required]
    });
  }

  ngOnInit() {
    this.cargarSuscripciones();
    this.cargarServicios();
    this.cargarUsuarios();
  }

  cargarSuscripciones(page = 1) {
    this.suscripcionService.listarPaginacion(page, this.limit).subscribe(
      (response: PaginationModel<Suscripcion>) => {
        this.paginacion.total = response.total;
        this.paginacion.totalPages = response.totalPages;
        this.paginacion.currentPage = response.currentPage;
        this.paginacion.data = response.data;
      },
      error => {
        this.toastr.error("Error al cargar los suscripciones", error.message);
      }
    );
  }

  cargarServicios() {
    this.servicioService.getAll().subscribe(
      (response: Servicio[]) => {
        this.servicios = response;
        this.serviciosFijo = response;
        console.log(this.servicios);
      },
      error => {
        this.toastr.error("Error al cargar los servicios", error.message);
      }
    );
  }

  cargarUsuarios() {
    this.usuarioService.getAll().subscribe(
      (response: Usuario[]) => {
        this.usuarios = response;
        console.log(this.usuarios);
      },
      error => {
        this.toastr.error("Error al cargar los servicios", error.message);
      }
    );
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
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



  public getestado(estado: boolean) {
    return estado ? "Activo" : "Inactivo";
  }
  public getMedidor(estado: boolean) {
    return estado ? "Con medidor" : "Sin medidor";
  }

  onPageChange(pageNumber: number): void {
    this.paginacion.currentPage = pageNumber;
    this.cargarSuscripciones(pageNumber);
  }
  roundDecimal(value: number): number {
    if (value < this.limit) {
      return 1;
    }
    value = value / this.limit;
    let a = value > 0 ? Math.ceil(value) : value;
    console.log(a);

    return a;
  }

  submitForm() {
    if (!this.form.valid) {
      return;
    }
    let usuario_id = this.form.get('usuario')?.value;
    let servicio_id = this.form.get('servicio')?.value;
    let tipo = this.form.get('tipo')?.value;
    let monto = this.form.get('monto')?.value;

    this.suscripcionService.crearSuscripcion(usuario_id, servicio_id, tipo, monto, tipo == "medidor").then(
      (response) => {
        this.modalService.dismissAll();
        this.toastr.success(response.message);
        this.cargarSuscripciones(this.paginacion.currentPage);
      }
    ).catch(error => {
      this.toastr.error(error.message);
    });
  }

  eliminarSuscripcion(id: number) {
    this.suscripcionService.eliminar(id).then((message) => {
      this.toastr.success(message);
      this.cargarSuscripciones(this.paginacion.currentPage);
    }).catch((error) => {
      this.toastr.error(error.message);
    });
  }

  cambioUsuario(event: any) {
    let usuarioIdSeleccionado = this.form.get('usuario')?.value;
    let usuario = this.usuarios.find((usuario) => usuario.id == usuarioIdSeleccionado);
    if (usuario) {
      let serviciosIds = usuario?.Servicios.map((servicio) => servicio.id);
      this.servicios = this.serviciosFijo.filter((servicio) => !serviciosIds.includes(servicio.id));
    }
  }

  cambiarServicio(event: any) {
    console.log(this.form.get('servicio')?.value);
  }

  cambiarTipo(event: any) {
    let tipo = this.form.get('tipo')?.value;
    console.log(this.form.get('tipo')?.value);
    if (tipo != "fijo") {
      this.form.get('monto')?.clearValidators();
    } else {
      this.form.get('monto')?.setValidators([Validators.required]);
    }
  }

  verRegistroDeMedidor(suscripcionId:number,servicio:Servicio, usuario: Usuario){
      this.router.navigate(['/suscripciones/',suscripcionId],{
        state: { data: {
          servicio: JSON.stringify(servicio),
          usuario: JSON.stringify(usuario),
        } }
      });
  }
}
