import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WhatsappService } from '../../core/services/whatsapp.service';
import { Configuracion } from '../../core/models/configuracion.models';
import { Subscription, interval } from 'rxjs';
import Swal from 'sweetalert2';
import { ConnectionQrState } from '../../core/enums/connection-qr-state.enum';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.css'],
})
export class WhatsappComponent {
  qrState = ConnectionQrState.NotConnected;
  connections = ConnectionQrState;
  configuracion = new Configuracion();
  imageQR: String = '';
  imageLoading: String = 'assets/images/spiner.svg';
  startedGenerateWhatsapp = false;
  isLoadedConfiguration = false;
  private intervalSubscription1: Subscription | undefined;
  private isGetQr = false;
  loadingQr = false;
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
        this.startedGenerateWhatsapp = this.configuracion.estado_conexion;
        this.isLoadedConfiguration = true;
        this.qrState = this.configuracion.estado_conexion ? ConnectionQrState.Connected : ConnectionQrState.NotConnected;
      },
      (error) => {
        this.toastr.error(error.message, '');
      }
    );
  }

  async getWhatsappQR() {
    if(this.qrState !== ConnectionQrState.GeneratedQR){
      this.qrState = ConnectionQrState.GeneratingQR;
    }
    this.whatsappService.getQrWhatsapp().then(
      (response) => {
        this.imageQR = response;
        this.loadingQr = false;
        this.startedGenerateWhatsapp = true;
        this.verifyConection();
        if (!this.isGetQr) {
          this.isGetQr = true;
          this.qrState = ConnectionQrState.GeneratedQR;
          this.startIntervalWithCallback(10000);
        }
      },
      (error) => {
        this.loadingQr = false;
        this.toastr.error(error.message, '');
      }
    );
  }
  verifyConection() {
    this.whatsappService.verificarConexionQr().then(
      (response) => {
        this.configuracion = response;
        this.startedGenerateWhatsapp = true;
        this.qrState = ConnectionQrState.Connected;
        this.stopInterval();
      },
      (error) => {
        this.loadingQr = false;
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
              this.isLoadedConfiguration = false;
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

  generateQrWhatsapp(){
    this.getWhatsappQR();
  }

  ngOnDestroy() {
    this.stopInterval();
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
