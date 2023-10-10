import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from 'src/app/dashboard/core/services/usuarios.service';

@Component({
  selector: 'app-user-buy-modal',
  templateUrl: './user-buy-modal.component.html',
  styleUrls: ['./user-buy-modal.component.css']
})
export class UserBuyModalComponent {
  @Input() montoDebePagar: number = 0.0;
  @Input() usuarioId: number = 0;
  form: FormGroup;
  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private usuarioService: UsuariosService,
    private toastr: ToastrService
    ) {
      this.form = formBuilder.group({
        monto_pagar:[0,Validators.required],
      });
  }

  ngOnInit() {
    console.log(this.montoDebePagar,this.usuarioId);
    this.form.setValue({
      monto_pagar: this.montoDebePagar,
    });
  }

  closeModal(){
    this.activeModal.dismiss('cerrar');
  }

  saveBuy(){
    let monto = this.form.get('monto_pagar')?.value;

    this.usuarioService.payUserDebtDynamic(this.usuarioId,monto).then(
      (response) => {
        this.activeModal.close(response);
      }
    ).catch(error => {
      this.toastr.success(error.message);
    });
  }
}
