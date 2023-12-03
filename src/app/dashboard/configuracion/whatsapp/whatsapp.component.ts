import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WhatsappService } from '../../core/services/whatsapp.service';
import { Configuracion } from '../../core/models/configuracion.models';
import { Subscription, interval } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.css'],
})
export class WhatsappComponent {
  configuracion = new Configuracion();
  imageQR: String = 'assets/images/spiner.svg';

  private intervalSubscription1: Subscription | undefined;
  private isGetQr = false;
  constructor(
    private whatsappService: WhatsappService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getConfiguracion();
  }

  getConfiguracion() {
    this.whatsappService.getConfiguracion().then(
      (response) => {
        this.configuracion = response;
        if (!this.configuracion.estado_conexion) {
          this.getWhatsappQR();
        }
      },
      (error) => {
        this.toastr.error(error.message, '');
      }
    );
  }

  getWhatsappQR() {
    this.whatsappService.getQrWhatsapp().then(
      (response) => {
        this.imageQR = response;
        this.verifyConection();
        if (!this.isGetQr) {
          this.startIntervalWithCallback(10000);
          this.isGetQr = true;
        }
      },
      (error) => {
        this.toastr.error(error.message, '');
      }
    );
  }
  verifyConection() {
    this.whatsappService.verificarConexionQr().then(
      (response) => {
        this.configuracion = response;
        this.stopInterval();
      },
      (error) => {
        // this.toastr.error(error.message,"");
      }
    );
  }

  desconectar() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Desvincular Whatsapp?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.whatsappService.desconectar().then(
          (response) => {
            this.imageQR = 'assets/images/spiner.svg';
            this.isGetQr = false;
            setTimeout(() => {
              this.getConfiguracion();
            }, 2500);
          },
          (error) => {
            this.toastr.error(error.message, '');
          }
        );
      }
    });
  }
  startIntervalWithCallback(secondsGetQr: number): void {
    this.intervalSubscription1 = interval(secondsGetQr).subscribe(() => {
      this.getWhatsappQR();
    });
  }

  // Función que detiene el intervalo
  stopInterval(): void {
    if (this.intervalSubscription1) {
      this.intervalSubscription1.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.stopInterval();
  }
}
