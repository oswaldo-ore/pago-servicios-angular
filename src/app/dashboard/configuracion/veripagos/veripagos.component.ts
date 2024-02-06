import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfiguracionService } from '../../core/services/configuracion.service';

@Component({
  selector: 'app-veripagos',
  templateUrl: './veripagos.component.html',
  styleUrls: ['./veripagos.component.css'],
})
export class VeripagosComponent {
  configuracionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private configService: ConfiguracionService
  ) {
    this.configuracionForm = this.fb.group({
      secretKey: [''],
      username: [''],
      password: [''],
    });
  }

  ngOnInit() {
    this.getConfiguration();
  }

  getConfiguration() {
    this.configService
      .getConfiguracion()
      .then((res) => {
        this.configuracionForm.patchValue({
          secretKey: res.secretKey,
          username: res.username,
          password: '',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  guardarConfiguracion() {
    this.configService
      .updateVeripagosConfiguracion(
        this.configuracionForm.value.secretKey,
        this.configuracionForm.value.username,
        this.configuracionForm.value.password
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
