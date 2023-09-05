import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from '../../core/services/usuarios.service';
import { DetalleUsuarioFacturas } from '../../core/models/detalle_factura.models';
import { FacturasService } from '../../core/services/facturas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detallepagousuario',
  templateUrl: './detallepagousuario.component.html',
  styleUrls: ['./detallepagousuario.component.css']
})
export class DetallepagousuarioComponent {
  usuarioId: number=0;
  form: FormGroup;
  detalleFacturaDeben:DetalleUsuarioFacturas[]=[];
  detalleFacturaPagadas:DetalleUsuarioFacturas[]=[];
  detalleFacturaId:number;
  @ViewChild('content') modalContent: any;
  constructor(
    private usuarioService: UsuariosService,
    private facturaServicio: FacturasService,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) {
    this.usuarioId = 0;
    this.form = formBuilder.group({
      monto: ['',Validators.required],
      isprestado: [false],
    });
    this.detalleFacturaId =0;
  }

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.usuarioId = +idParam;
        this.cargarDetalleFacturaUsuario();
      } else {
        console.error('ID es nulo');
      }
    });
  }

  cargarDetalleFacturaUsuario(){
    this.usuarioService.detalleDeudasUsuario(this.usuarioId).then(
      (response)=>{
        this.detalleFacturaDeben= response.deuda;
        this.detalleFacturaPagadas = response.pagadas;
      }
    ).catch(
      (error)=>{
        console.log(error);

      });
  }

  pagar(detalleId:number){

  }

  formatDate(fecha: Date){
    const options = { day: '2-digit', month: 'long', year: 'numeric' } as const;
    return fecha.toLocaleDateString('es-ES', options);
  }
  formatDate2(fecha: Date| null| undefined){
    if(fecha == null){
      return "";
    }
    const options2 = { day: '2-digit', month: 'long', year: 'numeric' } as const;
    return fecha.toLocaleDateString('es-ES', options2);
  }

  abrirModal(detalleId:number, monto:number,monto_pago:number) {
    this.detalleFacturaId = detalleId;
    this.form.get('monto')?.setValue(monto-monto_pago);
    this.modalService.open(this.modalContent, { ariaLabelledBy: 'modal-basic-title' });
  }

  devolverPago(detalleFacturaId:number){
    this.facturaServicio.devolverPagoDetalleFactura(detalleFacturaId).then(
      (response)=>{
        this.toast.success(response.message);
        this.cargarDetalleFacturaUsuario();
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
        this.cargarDetalleFacturaUsuario();
      }).catch((error)=>{
        this.toast.error(error);

      });
  }
}
