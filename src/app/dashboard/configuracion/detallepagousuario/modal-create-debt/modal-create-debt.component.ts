import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Servicio } from 'src/app/dashboard/core/models/servicios.model';
import { UsuariosService } from 'src/app/dashboard/core/services/usuarios.service';

@Component({
  selector: 'app-modal-create-debt',
  templateUrl: './modal-create-debt.component.html',
  styleUrls: ['./modal-create-debt.component.css']
})
export class ModalCreateDebtComponent {
  form: FormGroup;
  services: Servicio[] = [];
  userId: number = 0;
  constructor(
    private modalService: NgbActiveModal,
    private formBuilder: FormBuilder,
    private userService: UsuariosService,
    private toastr: ToastrService
  ) {
    this.form = formBuilder.group({
      servicio: ['', Validators.required],
      monto: ['',Validators.required],
      date: [ '' ,Validators.required],
    });
  }
  ngOnInit () {
    this.form.get('date')?.setValue(new Date());
  }

  closeModal() {
    this.modalService.dismiss('cerrar');
  }

  saveDebtToUser(){
    if(!this.form.valid){
      this.form.markAllAsTouched();
      return;
    }
    let dataForm = this.form.value;
    this.userService.createDebt(this.userId,dataForm.monto,dataForm.date,dataForm.servicio).then(
      (response) => {
        this.modalService.close(response);
      }
    ).catch(
      (error) => {
        this.toastr.error(error);
      }
    );
  }
}
