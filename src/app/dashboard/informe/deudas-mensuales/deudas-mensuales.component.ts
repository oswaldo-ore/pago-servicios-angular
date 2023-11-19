import { Component,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModel } from '../../core/interfaz/pagination.model';
import { DeudaMensual } from '../../core/models/deuda_mensual.models';
import { DeudasMensualesService } from '../../core/services/deudas-mensuales.service';
import { ToastrService } from 'ngx-toastr';
import { DetalleDeudaMensual } from '../../core/models/detalle_deuda_mensual.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalleDeudaMensualComponent } from '../deudas_mensuales/detalle-deuda-mensual/detalle-deuda-mensual.component';
import * as _moment from 'moment';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';


const moment =  _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MMMM YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-deudas-mensuales',
  templateUrl: './deudas-mensuales.component.html',
  styleUrls: ['./deudas-mensuales.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DeudasMensualesComponent {
  form: FormGroup;
  paginacion: PaginationModel<DeudaMensual> = {
    currentPage: 0,
    total: 0,
    totalPages: 0,
    data: [],
  }
  limit: number = 10;
  date = new FormControl(moment());

  setMonthAndYear(normalizedMonthAndYear: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.cargarDeudasMensuales(1);
  }
  public constructor(
    private formBuilder: FormBuilder,
    private deudasServicios: DeudasMensualesService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private dateAdapter: DateAdapter<any>
  ) {
    this.form = formBuilder.group({});
  }

  ngOnInit() {
    this.cargarDeudasMensuales();
    this.setSpanish();
  }

  cargarDeudasMensuales(page = 1) {
    const yearMonth = this.date.value?.format('YYYY-MM')??"";
    this.deudasServicios.getPaginacion(yearMonth,page, this.limit).subscribe(
      (response: PaginationModel<DeudaMensual>) => {
        this.paginacion = response;
      },
      error => {
        this.toastr.error("Error al cargar las deudas", error.message);
      }
    );
  }
  setSpanish() {
    // Set language of Datepicker
    this.dateAdapter.setLocale('es');
  }
  formatDate(fecha: Date){
    const options = { day: '2-digit', month: 'long', year: 'numeric' } as const;
    return fecha.toLocaleDateString('es-ES', options);
  }

  onPageChange(page=1){
    this.cargarDeudasMensuales(page);
  }

  navigateToDetalle(deudaMensual: DeudaMensual){
    console.log(deudaMensual);
    const modalRef = this.modalService.open(DetalleDeudaMensualComponent,{
      size: 'lg'
    });
    modalRef.componentInstance.deudaMensual = deudaMensual;
  }

  changeMonth(event: any){

  }
}
