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
import Swal from 'sweetalert2';
import { SuscripcionModalComponent } from './suscripcion-modal/suscripcion-modal.component';
import * as moment from 'moment';

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

  open(isCreating:boolean=true,suscripcion:Suscripcion|any=null) {
    const modalRef =  this.modalService.open(SuscripcionModalComponent,{
      size: 'lg'
    });
    modalRef.componentInstance.isCreating = isCreating;
    modalRef.componentInstance.servicios = this.servicios;
    modalRef.componentInstance.usuarios = this.usuarios;
    modalRef.componentInstance.serviciosFijo = this.servicios;
    if(!isCreating){
      modalRef.componentInstance.suscripcion = suscripcion;
    }
    modalRef.result.then(
      (result)=>{
        this.toastr.success(result.message);
        this.cargarSuscripciones(this.paginacion.currentPage);
      },
      (reason)=>{
        console.log(reason);
      }
    );
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
  getDayForData(fecha: Date| null| undefined){
    if(fecha == null){
      return "";
    }
    const fecha1 = moment(fecha).local().toDate().getDate();
    return fecha1 == 1 ? "( primer día )": ( fecha1 == 2 ?'(2 do día)': "( "+fecha1+" )");
  }
  isAutomatic(tipo : string){
    return tipo.trim() == "automatico".trim();
  }
  eliminarSuscripcion(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.suscripcionService.eliminar(id).then((message) => {
          this.toastr.success(message);
          this.cargarSuscripciones(this.paginacion.currentPage);
          Swal.fire('Acción confirmada', message, 'success');
        }).catch((error) => {
          this.toastr.error(error.message);
          Swal.fire('Cancelado', error.message, 'error');
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'La acción ha sido cancelada.', 'error');
      }
    });
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
