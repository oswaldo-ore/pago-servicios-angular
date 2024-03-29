import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from '../../core/services/usuarios.service';
import { DetalleUsuarioFacturas } from '../../core/models/detalle_factura.models';
import { FacturasService } from '../../core/services/facturas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiciosService } from '../../core/services/servicios.service';
import { Servicio } from '../../core/models/servicios.model';
import { ModalCreateDebtComponent } from './modal-create-debt/modal-create-debt.component';
import { ModalPrePaymentComponent } from './modal-pre-payment/modal-pre-payment.component';
import { PaginationModel } from '../../core/interfaz/pagination.model';

@Component({
  selector: 'app-detallepagousuario',
  templateUrl: './detallepagousuario.component.html',
  styleUrls: ['./detallepagousuario.component.css'],
})
export class DetallepagousuarioComponent {
  usuarioId: number = 0;
  form: FormGroup;
  detalleFacturaDeben: DetalleUsuarioFacturas[] = [];
  detalleFacturaPagadas: DetalleUsuarioFacturas[] = [];

  pagination: PaginationModel<DetalleUsuarioFacturas> = {
    currentPage: 0,
    total: 0,
    totalPages: 0,
    data: [],
  };
  limit: number = 10;
  state:number = -1;
  detalleFacturaId: number;
  //pago adelantado
  enableAdvancePayment: boolean = false;
  isFirstPetition: boolean = true;
  services: Servicio[] = [];
  @ViewChild('content') modalContent: any;
  constructor(
    private usuarioService: UsuariosService,
    private facturaServicio: FacturasService,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private serviciosService: ServiciosService,
    private router: Router
  ) {
    this.usuarioId = 0;
    this.form = formBuilder.group({
      // servicio: ['', Validators.required],
      monto: ['', Validators.required],
      isprestado: [false],
    });
    this.detalleFacturaId = 0;
    this.getAllServices();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.usuarioId = +idParam;
        this.getDetalleFacturaUsuarioWithPaginate();
      } else {
        console.error('ID es nulo');
      }
    });
  }
  getAllServices() {
    this.serviciosService.getAll().subscribe(
      (response) => {
        this.services = response;
      },
      (error) => {}
    );
  }
  getDetalleFacturaUsuarioWithPaginate(page = 1) {
    this.usuarioService
      .detalleDeudasUsuarioWithPaginate(this.usuarioId, page, this.limit, this.state)
      .subscribe(
        (response: PaginationModel<DetalleUsuarioFacturas>) => {
          this.pagination = response;
          if(this.isFirstPetition && page == 1){
            let detail = this.pagination.data.find(x => x.isPendiente() );
            if (detail) {
              this.enableAdvancePayment = false;
            }else{
              this.enableAdvancePayment = true;
            }
            this.isFirstPetition = false;
          }
        },
        (error) => {}
      );
  }
  cargarDetalleFacturaUsuario() {
    this.usuarioService
      .detalleDeudasUsuario(this.usuarioId)
      .then((response) => {
        this.detalleFacturaDeben = response.deuda;
        this.detalleFacturaPagadas = response.pagadas;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  pagar(detalleId: number) {}

  formatDate(fecha: Date) {
    const options = { day: '2-digit', month: 'long', year: 'numeric' } as const;
    return fecha.toLocaleDateString('es-ES', options);
  }
  formatDate2(fecha: Date | null | undefined) {
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

  abrirModal(detalleId: number, monto: number, monto_pago: number) {
    this.detalleFacturaId = detalleId;
    this.form.get('monto')?.setValue(monto - monto_pago);
    this.modalService.open(this.modalContent, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  devolverPago(detalleFacturaId: number) {
    this.facturaServicio
      .devolverPagoDetalleFactura(detalleFacturaId)
      .then((response) => {
        this.toast.success(response.message);
        this.getDetalleFacturaUsuarioWithPaginate();
      })
      .catch((error) => {
        this.toast.error(error);
      });
  }

  public pagarFactura() {
    if (!this.form.valid) {
      return;
    }
    let monto = this.form.get('monto')?.value;
    let isprestado = this.form.get('isprestado')?.value;
    this.facturaServicio
      .pagarDetalleFactura(monto, this.detalleFacturaId, isprestado ?? false)
      .then((response) => {
        this.toast.success(response.message);
        this.form.reset();
        this.modalService.dismissAll();
        this.getDetalleFacturaUsuarioWithPaginate();
      })
      .catch((error) => {
        this.toast.error(error);
      });
  }

  public openModalCreateDebt() {
    const modalCreateDebt = this.modalService.open(ModalCreateDebtComponent);
    modalCreateDebt.componentInstance.services = this.services.slice();
    modalCreateDebt.componentInstance.userId = this.usuarioId;
    modalCreateDebt.result.then(
      (result) => {
        this.toast.success(result);
        this.getDetalleFacturaUsuarioWithPaginate();
      },
      (reason) => {
        console.log(reason);
      }
    );
  }

  public openModalCreatePrePayment() {
    const modalCreatePrePayment = this.modalService.open(
      ModalPrePaymentComponent,
      {
        backdrop: 'static',
        keyboard: false,
      }
    );
    modalCreatePrePayment.componentInstance.services = this.services;
    modalCreatePrePayment.componentInstance.userId = this.usuarioId;
    modalCreatePrePayment.result.then((result) => {
      this.toast.success(result);
      this.showPrepaymentsToUser(this.usuarioId);
    });
  }

  showPrepaymentsToUser(usuarioId: number) {
    this.router.navigate(['/usuario/detalle-adelantos/', usuarioId]);
  }
  onChangeState(event: any) {
    this.state = event.target.value;
    this.getDetalleFacturaUsuarioWithPaginate();
  }
  onPageChange(page = 1) {
    this.getDetalleFacturaUsuarioWithPaginate(page);
  }
}
