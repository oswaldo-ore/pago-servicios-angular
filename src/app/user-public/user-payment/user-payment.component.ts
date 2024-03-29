import { Component } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { ServiciosService } from '../../dashboard/core/services/servicios.service';
import { DetalleUsuarioFacturas } from 'src/app/dashboard/core/models/detalle_factura.models';
import { UsuariosService } from 'src/app/dashboard/core/services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/dashboard/core/guards2/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.css'],
})
export class UserPaymentComponent {
  code: any;
  services: any;
  user: any;
  deudas: DetalleUsuarioFacturas[] = [];
  year = new Date().getFullYear();
  constructor(
    private serviciosService: ServiciosService,
    private userService: UsuariosService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.code = params['code'];
      this.getUser();
    });
  }
  async getUser() {
    this.authService
      .userVerify(this.code)
      .then((response) => {
        if (response.success == false) {
          this.router.navigate(['/']);
        } else {
          this.user = response.data;
          this.getServices();
          this.getDebts();
        }
      })
      .catch((error) => {
        this.toastr.error(
          'No se pudo conectar al servidor',
          'Error de conexión'
        );
      });
  }
  async getServices() {
    this.serviciosService
      .getServicesUserByCode(this.code)
      .then((response) => {
        this.services = response;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async getDebts() {
    this.userService.getDebtsUserByCode(this.code).subscribe(
      (response) => {
        this.deudas = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
