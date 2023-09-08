import { Component } from '@angular/core';
import { ServiciosService } from '../../core/services/servicios.service';
import { PaginationModel } from '../../core/interfaz/pagination.model';
import { Servicio } from '../../core/models/servicios.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent {
  servicios: PaginationModel<Servicio> = {
    currentPage: 0,
    total: 0,
    totalPages: 0,
    data: []
  };
  limit: number = 10;
  searchTerms: string = '';
  closeResult = '';
  form: FormGroup;
  constructor(
    private serviciosService: ServiciosService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.form = formBuilder.group({
      nombre: ['',Validators.required],
      asociar:[""],
    });
  }

  ngOnInit() {
    this.cargarServicios();
  }

  cargarServicios(page = 1) {
    this.serviciosService.getPaginacion(page, this.limit).subscribe(
      (response: PaginationModel<Servicio>) => {
        this.servicios = response;
      },
      error => {
        this.toastr.error("Error al cargar los servicios", error.message);
      }
    );
  }
  getAsociarValue(id: number): string {
    const servicio = this.servicios.data.find(item => item.id === id);
    return servicio != null ? servicio.nombre : '';
  }

  public getestado(estado: Number) {
    return estado == 1 ? "Activo" : "Inactivo";
  }

  onPageChange(pageNumber: number): void {
    this.cargarServicios(pageNumber);
  }
  roundDecimal(value: number): number {
    // console.log("Total "+Math.ceil(value));
    if (value < this.limit) {
      return 1;
    }
    let a = value > 0 ? Math.ceil(value) : value;
    return a;
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

  submitForm(){
    if(this.form.valid){
      let nombre = this.form.get('nombre')?.value;
      let asociar = this.form.get('asociar')?.value??"";
      this.serviciosService.guardar(nombre,asociar).then(
        (response) => {
          this.modalService.dismissAll();
          this.toastr.success(response.message);
          this.cargarServicios();
        }
      ).catch(error => {
        this.toastr.success(error.message);
      });
    }
  }

  eliminarServicio(id:number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviciosService.eliminar(id).then((message)=>{
          this.toastr.success(message);
          this.cargarServicios();
          Swal.fire('Acción confirmada', message, 'success');
        }).catch((error)=>{
          this.toastr.error(error.message);
          Swal.fire('Cancelado', error.message, 'error');
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'La acción ha sido cancelada.', 'error');
      }
    });
  }
}
