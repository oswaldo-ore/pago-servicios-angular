import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationModel } from '../interfaz/pagination.model';
import { Observable, map } from 'rxjs';
import { GlobalComponent } from 'src/app/utils/global-component';
import { Factura } from '../models/factura.models';
import { DatePipe } from '@angular/common';
import { DetalleUsuarioFacturas } from '../models/detalle_factura.models';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  constructor(private http: HttpClient) { }

  getPaginacion(pageNumber: number = 1, limit: number = 8, search: string = '', startMonth: string = '', endMonth:string = ''): Observable<PaginationModel<Factura>> {
    const params = new HttpParams().set('page', pageNumber.toString()).set('limit', limit.toString())
    .set('search', search).set('start_month', startMonth).set('end_month', endMonth);
    return this.http.get<any>(GlobalComponent.facturas_listar, { params }).pipe(
      map(response => {
        if (response.success) {
          const facturaArray = response.data.data.map((facturaData: any) => new Factura(
            facturaData.id,
            facturaData.monto,
            new Date(facturaData.fecha),
            facturaData.ispagado,
            facturaData.notifico,
            facturaData.visto,
            facturaData.estado,
            facturaData.foto_factura,
            facturaData.servicioid,
            facturaData.Servicio,
            facturaData.DetalleUsuarioFacturas.map(
              (detalle: { id: number; monto: number; estado: number; monto_pago: number;
                cambio_pago: number; facturaid: number; fecha: string | number | Date;
                fecha_pago: string | number | Date; notificar: boolean; visto: number;
                servicioid: number; usuarioid: number; Usuario: { id: number; nombre: string;
                  apellidos: string; estado: number; };
              })=>{
              return new DetalleUsuarioFacturas(
                detalle.id,
                detalle.monto,
                detalle.estado,
                detalle.monto_pago,
                detalle.cambio_pago,
                detalle.facturaid,
                new Date(detalle.fecha),
                detalle.fecha_pago?new Date(detalle.fecha_pago):null,
                detalle.notificar,
                detalle.visto,
                detalle.servicioid,
                detalle.usuarioid,
                new Usuario(detalle.Usuario.id,detalle.Usuario.nombre,detalle.Usuario.apellidos,detalle.Usuario.estado),
                );
            }),
          ));
          response.data.data = facturaArray;
          return response.data;
        }
        throw response.message;
      })
    );
  }

   async verFactura(id:number): Promise<Factura>{
    const url = `${GlobalComponent.facturas_show}${id}`;
    let response =  await this.http.get<any>(url).toPromise();
    if (response.success) {
      let facturaData = response.data as Factura;
      console.log(facturaData);

      facturaData = new Factura(
        facturaData.id,
        facturaData.monto,
        new Date(facturaData.fecha),
        facturaData.ispagado,
        facturaData.notifico,
        facturaData.visto,
        facturaData.estado,
        facturaData.foto_factura,
        facturaData.servicioid,
        facturaData.Servicio,
        facturaData.DetalleUsuarioFacturas.map((detalle)=>{
          return new DetalleUsuarioFacturas(
            detalle.id,
            detalle.monto,
            detalle.estado,
            detalle.monto_pago,
            detalle.cambio_pago,
            detalle.facturaid,
            new Date(detalle.fecha),
            detalle.fecha_pago?new Date(detalle.fecha_pago):null,
            detalle.notificar,
            detalle.visto,
            detalle.servicioid,
            detalle.usuarioid,
            new Usuario(detalle.Usuario.id,detalle.Usuario.nombre,detalle.Usuario.apellidos,detalle.Usuario.estado),
            );
        }),
      );
      response.data = facturaData;
      return response.data;
    }
    throw response.message;
  }

  async crear(servicio: number, monto: number, fecha: Date, imagen: File|any)  {
    let date = fecha.toISOString().split('T')[0];
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const formData = new FormData();
    formData.append('monto', monto.toString());
    formData.append('fecha', date);
    formData.append('servicioid', servicio.toString());
    formData.append('foto', imagen);
    let response = await this.http.post<any>(GlobalComponent.facturas_crear, formData,{ headers: headers}).toPromise();
    if (response.success) {
      return response;
    }
    throw response.message;
  }

  async pagarDetalleFactura( monto: number, detalleFacturaId:number,isPrestado:boolean)  {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const formData = { monto: monto.toString(), detalle_factura_id: detalleFacturaId.toString(),isprestado:isPrestado};
    let response = await this.http.post<any>(GlobalComponent.detalle_factura_pagar, formData,{headers}).toPromise();
    if (response.success) {
      return response;
    }
    throw response.message;
  }

  async devolverPagoDetalleFactura( detalleFacturaId:number)  {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const formData = {  detalle_factura_id: detalleFacturaId.toString()};
    let response = await this.http.post<any>(GlobalComponent.detalle_factura_devolver, formData,{headers}).toPromise();
    if (response.success) {
      return response;
    }
    throw response.message;
  }

  async eliminar(id:number) {
    const url = `${GlobalComponent.facturas_eliminar}${id}`;
    let response =  await this.http.delete<any>(url).toPromise();
    if(response.success){
      return (String)(response.message);
    }else{
      throw (String)(response.message);
    }
  }
  async prestarFacturaPagar(id:number) {
    const url = `${GlobalComponent.factura_prestar}`.replace(":id",id.toString());
    const data = { key: 'value' };
    let response =  await this.http.put<any>(url,data).toPromise();
    if(response.success){
      return (String)(response.message);
    }else{
      throw (String)(response.message);
    }
  }
}
