import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from '../../core/services/usuarios.service';
import { PaginationModel } from '../../core/interfaz/pagination.model';
import { Usuario } from '../../core/models/usuario.model';
import { Servicio } from '../../core/models/servicios.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  limit: number = 2;
  searchTerms: string = '';
  closeResult = '';
  form: FormGroup;
  paginacion: PaginationModel<Usuario>= {
    currentPage: 0,
    total: 0,
    totalPages: 0,
    data: []
  };
  constructor(
    private usuarioService: UsuariosService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.form = formBuilder.group({
      nombre: ['',Validators.required],
      apellidos: ['',Validators.required]
    });
  }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios(page = 1){
    this.usuarioService.getPaginacion(page, this.limit).subscribe(
      (response: PaginationModel<Usuario>) => {
        this.paginacion = response;
        console.log(this.paginacion);
      },
      error => {
        this.toastr.error("Error al cargar los usuarios", error.message);
      }
    );
  }
  public getestado(estado: Number) {
    return estado == 1 ? "Activo" : "Inactivo";
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

  serviciosAString(servicios:Servicio[]){
    const nombresServicios = servicios.map(servicio => servicio.nombre);
    const serviciosList = nombresServicios.map(nombre => `<li>${nombre}</li>`).join('');
    return `<ul class="mb-0">${serviciosList}</ul>`;
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
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

  public submitForm(){
    if(this.form.valid){
      let nombre = this.form.get('nombre')?.value;
      let apellidos = this.form.get('apellidos')?.value??"";
      this.usuarioService.crearUsuario(nombre,apellidos).then(
        (response) => {
          this.modalService.dismissAll();
          this.toastr.success(response.message);
          this.cargarUsuarios();
        }
      ).catch(error => {
        this.toastr.success(error.message);
      });
    }
  }

  eliminarUsuario(id:number){
    this.usuarioService.eliminar(id).then((message)=>{
      this.toastr.success(message);
      this.cargarUsuarios();
    }).catch((error)=>{
      this.toastr.error(error.message);
    });
}
}
