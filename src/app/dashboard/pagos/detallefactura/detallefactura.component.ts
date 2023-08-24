import { Component } from '@angular/core';
import { FacturasService } from '../../core/services/facturas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Factura } from '../../core/models/factura.models';
import { ActivatedRoute } from '@angular/router';
import { Servicio } from '../../core/models/servicios.model';

@Component({
  selector: 'app-detallefactura',
  templateUrl: './detallefactura.component.html',
  styleUrls: ['./detallefactura.component.css']
})
export class DetallefacturaComponent {
  form: FormGroup;
  factura:Factura = new Factura(0,0,new Date(),0,0,"",0,new Servicio(0,"",0,null),[]);
  searchTerms: string = "";
  receivedId: number;
  constructor(
    private facturaServicio: FacturasService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.form = formBuilder.group({
    });
    this.receivedId = 0;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.receivedId = +idParam;
        this.cargarDetalleFactura();
      } else {
        console.error('ID es nulo');
      }
    });
  }

  cargarDetalleFactura(){
    this.facturaServicio.verFactura(this.receivedId).then(
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
    console.log("normal 12 "+fecha);

    if(fecha == null){
      return "";
    }
    const options2 = { day: '2-digit', month: 'long', year: 'numeric' } as const;
    return fecha.toLocaleDateString('es-ES', options2);
  }
  public getestado(estado: boolean) {
    return estado ? "Cancelado" : "No cancelado";
  }
}
