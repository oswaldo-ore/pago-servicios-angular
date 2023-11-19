import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DeudaMensual } from 'src/app/dashboard/core/models/deuda_mensual.models';

@Component({
  selector: 'app-detalle-deuda-mensual',
  templateUrl: './detalle-deuda-mensual.component.html',
  styleUrls: ['./detalle-deuda-mensual.component.css']
})
export class DetalleDeudaMensualComponent {
  @Input() deudaMensual: DeudaMensual|any ;
  constructor(
    private activeModal: NgbActiveModal,
  ){}

  closeModal(){
    this.activeModal.dismiss('cerrar');
  }
}
