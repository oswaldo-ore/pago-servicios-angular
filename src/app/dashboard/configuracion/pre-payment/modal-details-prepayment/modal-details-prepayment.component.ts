import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-details-prepayment',
  templateUrl: './modal-details-prepayment.component.html',
  styleUrls: ['./modal-details-prepayment.component.css']
})
export class ModalDetailsPrepaymentComponent {
  @Input() detailsPrePayment: any[] = [];
  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit(){
    console.log(this.detailsPrePayment);
  }

  closeModal() {
    this.activeModal.dismiss('cerrar');
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
}
