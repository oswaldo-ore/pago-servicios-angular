import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Servicio } from 'src/app/dashboard/core/models/servicios.model';
import { PrePaymentService } from '../../../core/services/pre-payment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-pre-payment',
  templateUrl: './modal-pre-payment.component.html',
  styleUrls: ['./modal-pre-payment.component.css'],
})
export class ModalPrePaymentComponent {
  form: FormGroup;
  services: Servicio[] = [];
  userId: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbActiveModal,
    private prePaymentService: PrePaymentService,
    private toast: ToastrService,
  ) {
    this.form = formBuilder.group({
      service: ['',Validators.required],
      amount: ['',Validators.required],
      description: ['',Validators.required],
    });
  }

  closeModal() {
    this.modalService.dismiss('cerrar');
  }
  savePrePaymentToUser() {
    if (!this.form.valid) {
      this.form.touched;
      return;
    }
    let data = this.form.value;
    this.prePaymentService.savePrePaymentToUser(this.userId,data.service,data.amount,data.description).then(
      (response) => {
        this.modalService.close(response.message);
      },
      (error) => {
        this.toast.error(error);
      }
    );
  }
}
