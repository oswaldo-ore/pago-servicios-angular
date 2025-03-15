import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Servicio } from '../../core/models/servicios.model';
import { Usuario } from '../../core/models/usuario.model';
import { SuscripcionService } from '../../core/services/suscripcion.service';
import { Medidor } from '../../core/models/medidor.models';
import { PaginationModel } from '../../core/interfaz/pagination.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-medidores',
  templateUrl: './medidores.component.html',
  styleUrls: ['./medidores.component.css'],
})
export class MedidoresComponent {
  form: FormGroup;
  searchTerms: string = '';
  usuarioId: number;
  servicioId: number;
  servicio: Servicio;
  usuario: Usuario;
  limit: number = 8;
  suscripcionId: number = 0;
  closeResult: string = '';
  selected: Date = new Date();
  paginacion: PaginationModel<Medidor> = {
    currentPage: 0,
    total: 0,
    totalPages: 0,
    data: [],
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private suscripcionService: SuscripcionService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.form = formBuilder.group({
      cantidad_medido: ['', Validators.required],
      monto: ['', Validators.required],
      detalle: ['', Validators.required],
    });
    this.usuarioId = 0;
    this.servicioId = 0;
    let data = history.state.data;
    this.servicio = JSON.parse(data.servicio);
    this.usuario = JSON.parse(data.usuario);
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const suscripcionId = params.get('id');
      if (suscripcionId != null) {
        this.suscripcionId = parseInt(suscripcionId);
        this.cargarMedidores();
      }
    });
  }

  cargarMedidores(page = 1) {
    this.suscripcionService
      .listarPaginacionDeMedidoresDeLaSuscripcion(
        page,
        this.limit,
        this.suscripcionId
      )
      .subscribe(
        (response) => {
          this.paginacion = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
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
  formatDate(fecha: Date) {
    try {
      const options = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      } as const;
      return fecha.toLocaleDateString('es-ES', options);
    } catch (e) {
      console.log("Error:"+  e);
      return '';
    }
  }
  formatDate2(fecha: Date | null) {
    if (fecha == null) {
      return '';
    }
    const options2 = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    } as const;
    return fecha.toLocaleDateString('es-ES', options2);
  }
  public getestado(estado: boolean) {
    return estado ? 'Cancelado' : 'No cancelado';
  }

  onPageChange(pageNumber: number): void {
    this.paginacion.currentPage = pageNumber;
    this.cargarMedidores(pageNumber);
  }

  submitForm() {
    if (!this.form.valid) {
      return;
    }
    let monto = this.form.get('monto')?.value;
    let cantidad_medido = this.form.get('cantidad_medido')?.value;
    let detalle = this.form.get('detalle')?.value;
    let selectedDate = this.selected;
    let mes = this.selected.getUTCMonth() + 1;
    this.suscripcionService
      .crearMedidorDeSuscripcion(
        this.usuario.id,
        this.servicio.id,
        selectedDate,
        cantidad_medido,
        monto,
        mes,
        detalle
      )
      .then((response) => {
        this.modalService.dismissAll();
        this.toastr.success(response.message);
        this.cargarMedidores(this.paginacion.currentPage);
      })
      .catch((error) => {
        this.toastr.error(error, 'No se pudo completar la accion');
      });
  }
}
