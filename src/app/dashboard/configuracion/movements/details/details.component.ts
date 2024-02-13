import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailMovement } from 'src/app/dashboard/core/interfaz/detail_movement';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  @Input() detailsMovement: DetailMovement[] = [];
  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit(){
    console.log(this.detailsMovement);
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
