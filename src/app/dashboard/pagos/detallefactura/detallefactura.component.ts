import { Component, ViewChild } from '@angular/core';
import { FacturasService } from '../../core/services/facturas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Factura } from '../../core/models/factura.models';
import { ActivatedRoute } from '@angular/router';
import { Servicio } from '../../core/models/servicios.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detallefactura',
  templateUrl: './detallefactura.component.html',
  styleUrls: ['./detallefactura.component.css']
})
export class DetallefacturaComponent {
  form: FormGroup;
  factura:Factura = new Factura(0,0,new Date(),false,0,0,"",0,new Servicio(0,"",0,null),[]);
  searchTerms: string = "";
  detalleFactura: number;
  detalleFacturaId:number;
  @ViewChild('content') modalContent: any;
  constructor(
    private facturaServicio: FacturasService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private modalService: NgbModal,
  ) {
    this.form = formBuilder.group({
      monto: ['',Validators.required],
      isprestado: [false],
    });
    this.detalleFactura = 0;
    this.detalleFacturaId=0;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.detalleFactura = +idParam;
        this.cargarDetalleFactura();
      } else {
        console.error('ID es nulo');
      }
    });
  }

  cargarDetalleFactura(){
    this.facturaServicio.verFactura(this.detalleFactura).then(
      (response)=>{
        this.factura = response;
      }
    ).catch(
      (error)=>{
      }
    );
  }

  formatDate(fecha: Date){
    console.log("normal "+fecha);

    const options = { day: '2-digit', month: 'long', year: 'numeric' } as const;
    return fecha.toLocaleDateString('es-ES', options);
  }
  formatDate2(fecha: Date| null){
    if(fecha == null){
      return "";
    }
    const options2 = { day: '2-digit', month: 'long', year: 'numeric' } as const;
    return fecha.toLocaleDateString('es-ES', options2);
  }
  public getestado(estado: boolean) {
    return estado ? "Cancelado" : "No cancelado";
  }

  abrirModal(detalleFacturaId:number) {
    this.detalleFacturaId = detalleFacturaId;
    console.log(detalleFacturaId);
    this.modalService.open(this.modalContent, { ariaLabelledBy: 'modal-basic-title' });
  }

  devolverPago(detalleFacturaId:number){
    this.facturaServicio.devolverPagoDetalleFactura(detalleFacturaId).then(
      (response)=>{
        this.toast.success(response.message);
        this.cargarDetalleFactura();
      }).catch((error)=>{
        this.toast.error(error);
      });
  }

  public pagarFactura(){
    if(!this.form.valid){
      return;
    }
    let monto = this.form.get('monto')?.value;
    let isprestado = this.form.get('isprestado')?.value;
    this.facturaServicio.pagarDetalleFactura(monto,this.detalleFacturaId,isprestado??false).then(
      (response)=>{
        this.toast.success(response.message);
        this.form.reset();
        this.modalService.dismissAll();
        this.cargarDetalleFactura();
      }).catch((error)=>{
        this.toast.error(error);

      });
  }
}
