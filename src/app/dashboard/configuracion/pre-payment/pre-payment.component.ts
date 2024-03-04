import { Component } from '@angular/core';
import { PaginationModel } from '../../core/interfaz/pagination.model';
import { PrePaymentService } from '../../core/services/pre-payment.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDetailsPrepaymentComponent } from './modal-details-prepayment/modal-details-prepayment.component';

@Component({
  selector: 'app-pre-payment',
  templateUrl: './pre-payment.component.html',
  styleUrls: ['./pre-payment.component.css'],
})
export class PrePaymentComponent {
  usuarioId: number = 0;
  pagination: PaginationModel<any> = {
    currentPage: 0,
    total: 0,
    totalPages: 0,
    data: [],
  };
  limit: number = 10;
  constructor(
    private prePaymentService: PrePaymentService,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.usuarioId = +idParam;
        this.getMovementsWithPaginateToUser(this.usuarioId);
        // this.getMovementsToUser(this.usuarioId);
      } else {
        console.error('ID es nulo');
      }
    });
  }

  getMovementsWithPaginateToUser(
    userId: number,
    page: number = 1,
    limit: number = 10
  ) {
    this.prePaymentService
      .getPrepaymentToUser(userId, page, limit)
      .then((response) => {
        this.pagination = response;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  formatDate(fecha: Date) {
    const options = { day: '2-digit', month: 'long', year: 'numeric' } as const;
    if (typeof fecha === 'string') {
      const fechaDate = new Date(fecha);

      if (!isNaN(fechaDate.getTime())) {
        return fechaDate.toLocaleDateString('es-ES', options);
      }
    }
    return fecha.toLocaleDateString('es-ES', options);
  }

  openModalDetails(detailsPrepayment: any[]) {
    const modalRef = this.modalService.open(ModalDetailsPrepaymentComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.detailsPrePayment = detailsPrepayment;
  }

  onPageChange(page: number) {
    this.getMovementsWithPaginateToUser(this.usuarioId, page, this.limit);
  }
}
