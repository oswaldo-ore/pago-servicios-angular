import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Servicio } from 'src/app/dashboard/core/models/servicios.model';
import { Suscripcion } from 'src/app/dashboard/core/models/suscripcion.models';
import { Usuario } from 'src/app/dashboard/core/models/usuario.model';
import { SuscripcionService } from 'src/app/dashboard/core/services/suscripcion.service';

@Component({
  selector: 'app-suscripcion-modal',
  templateUrl: './suscripcion-modal.component.html',
  styleUrls: ['./suscripcion-modal.component.css']
})
export class SuscripcionModalComponent {
  @Input() suscripcion: Suscripcion|any;
  @Input() isCreating: boolean = false;
  @Input() servicios: Servicio[]=[];
  @Input() usuarios: Usuario[]=[];
  serviciosFijo: Servicio[] = [];
  fechaActual = new Date();
  public form: FormGroup;

  constructor(
    private modalService: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private suscripcionService: SuscripcionService,
  ){
    this.form = formBuilder.group({
      tipo: ['fijo', Validators.required],
      servicio: [0, Validators.required],
      usuario: [0, Validators.required],
      monto: [0, Validators.required],
      fecha_deuda: [null],
    });
  }

  ngOnInit(){
    if(!this.isCreating){
      this.form.get('tipo')?.setValue(this.suscripcion.tipo );
      this.form.get('usuario')?.setValue(this.suscripcion.usuarioid );
      this.form.get('servicio')?.setValue(this.suscripcion.servicioid );
      this.form.get('monto')?.setValue(this.suscripcion.monto );
      this.form.get('fecha_deuda')?.setValue(this.suscripcion.fecha_deuda );
      this.form.get('usuario')?.disable();
      this.form.get('servicio')?.disable();
    }else{
      this.form.get('tipo')?.setValue('');
      this.form.get('usuario')?.setValue('');
      this.form.get('servicio')?.setValue('');
      this.form.get('monto')?.setValue('');
      this.form.get('fecha_deuda')?.setValue('');
      this.form.get('usuario')?.enable();
      this.form.get('servicio')?.enable();
    }
  }

  cambiarServicio(event: any) {
    console.log(this.form.get('servicio')?.value);
  }

  cambiarTipo(event: any) {
    let tipo = this.form.get('tipo')?.value;
    console.log(this.form.get('tipo')?.value);
    if (tipo == "fijo") {
      this.form.get('monto')?.setValidators([Validators.required]);
    } else {
      this.form.get('monto')?.clearValidators();
    }
    this.form.get('monto')?.updateValueAndValidity();
    if(tipo == "automatico"){
      this.form.get('monto')?.setValidators([Validators.required]);
      this.form.get('fecha_deuda')?.setValidators([Validators.required]);
    }else{
      this.form.get('fecha_deuda')?.clearValidators();
    }
  }

  saveUser(){
    console.log(this.form.valid);
    console.log(this.form);
    if(this.form.valid){
      let usuario_id = this.form.get('usuario')?.value;
      let servicio_id = this.form.get('servicio')?.value;
      let tipo = this.form.get('tipo')?.value;
      let fecha_deuda = this.form.get('fecha_deuda')?.value;
      let monto = tipo == "fijo" || tipo == "automatico"? this.form.get('monto')?.value:0;
      let fecha = tipo == "automatico" ? moment(fecha_deuda).format('YYYY-MM-DD HH:mm:ss'):null;
      if(this.isCreating){
        console.log(fecha);
        this.suscripcionService.crearSuscripcion(usuario_id,servicio_id,tipo,monto,tipo == "medidor",fecha ).then(
          (response) => {
            this.modalService.close(response);
          }
        ).catch(error => {
          this.toastr.error(error);
        });
      }else{
        let id = this.suscripcion.id;
        this.suscripcionService.updateSuscripcion(id,usuario_id,servicio_id,tipo,monto,tipo == "medidor",fecha ).then(
          (response) => {
            this.modalService.close(response);
          }
        ).catch(error => {
          this.toastr.error(error);
        });
      }
    }else{
      this.toastr.error(this.form.errors?.toString() || "Formulario invalido");
    }
  }

  closeModal(){
    this.modalService.dismiss('cerrar');
  }
}
