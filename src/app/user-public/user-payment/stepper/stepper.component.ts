import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { forEach } from 'lodash';
import { DetalleUsuarioFacturas } from 'src/app/dashboard/core/models/detalle_factura.models';
import { UsuariosService } from 'src/app/dashboard/core/services/usuarios.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isEditable = false;

  @Input() services: any[] = [];
  @Input() deudas: DetalleUsuarioFacturas[] = [];
  @Input() deudasByServiceSelected: DetalleUsuarioFacturas[] = [];

  selectedServiceIds: number[] = [];
  selectedDeudasIds: number[] = [];
  selectedIndexes: number[] = [0];
  totalDebt: number = 0;
  totalPrice: number = 0;
  totalPriceSelected: number = 0;

  veripagos: any = null;

  @ViewChild('stepper') stepper!: MatStepper;
  constructor(
    private _formBuilder: FormBuilder,
    private usersService: UsuariosService
  ) {}


  ngOnInit(): void {
    console.log(this.services);

    this.totalDebt = this.services.reduce((acc, service) => {
      acc += service.monto_por_servicio;
      return parseFloat(acc.toFixed(2));
    }, 0);
  }

  toggleSelection(serviceId: number) {
    const index = this.selectedServiceIds.indexOf(serviceId);
    if (index === -1) {
      this.selectedServiceIds.push(serviceId); // Agregar el ID si no existe en el arreglo
    } else {
      this.selectedServiceIds.splice(index, 1); // Eliminar el ID si ya existe en el arreglo
    }
  }

  showDeudasByServiceSelected() {
    this.deudasByServiceSelected = [];
    this.selectedDeudasIds = [];
    this.selectedIndexes = [0];
    this.totalPriceSelected = 0;
    this.totalPrice = 0;
    //order by por fecha y por servicio
    this.deudasByServiceSelected = this.deudas.filter((deuda) => {
      return this.selectedServiceIds.includes(deuda.servicioid);
    });
    this.totalPrice = this.deudasByServiceSelected.reduce((acc, deuda) => {
      acc += deuda.montoAPagar();
      return acc;
    }, 0);
  }

  generateIndex(index: number) {
    this.selectedIndexes = [];
    for (let i = 0; i <= index; i++) {
      this.selectedIndexes.push(i);
    }
  }

  updateDeudaPrice() {
    //sacar el precio total de las deudas seleccionadas
    this.totalPriceSelected = this.deudasByServiceSelected.reduce(
      (acc, deuda) => {
        if (this.selectedDeudasIds.includes(deuda.id)) {
          acc += deuda.montoAPagar();
        }
        return acc;
      },
      0
    );
  }
  selectDeuda(deudaId: number, index: number): void {
    const currentIndex = this.selectedDeudasIds.indexOf(deudaId);
    if (currentIndex !== -1) {
      this.selectedDeudasIds.splice(currentIndex);
      this.generateIndex(index);
    } else {
      this.selectedDeudasIds.push(deudaId);
      this.selectedIndexes.push(index + 1);
    }
    this.updateDeudaPrice();
  }

  isDeudaSelected(deudaId: number): boolean {
    return this.selectedDeudasIds.includes(deudaId);
  }
  isCheckboxDisabled(index: number): boolean {
    const isSelected = this.selectedIndexes.includes(index);
    return !isSelected;
  }

  generateQrCode() {
    this.usersService.generateCodeQr(this.selectedDeudasIds).then((response) => {
      this.veripagos = response;
      this.loopVerifyQr();
    }).catch((error) => {
      console.error(error);
    });
  }
  private intervalId: any;
  loopVerifyQr() {
    this.intervalId = setInterval(() => {
      this.verifyQrCode();
    }, 5000);
  }

  verifyQrCode() {
    this.usersService
      .verifyCodeQr(this.veripagos.veripagos_instance_id)
      .then((response) => {
        clearInterval(this.intervalId);
        this.goToPaymentSuccessfull();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  stepperBackPage2() {
    this.veripagos = null;
    clearInterval(this.intervalId);
  }

  goToPaymentSuccessfull(){
    this.stepper?.next();
    setTimeout(() => {
      //reload page
      window.location.reload();
    }, 4000);
  }

  verifyPayment() {
    this.verifyQrCode();
  }
}
