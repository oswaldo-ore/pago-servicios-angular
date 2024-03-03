import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationModel } from '../interfaz/pagination.model';
import { Observable, map } from 'rxjs';
import { GlobalComponent } from 'src/app/utils/global-component';
import { Suscripcion } from '../models/suscripcion.models';
import { Medidor } from '../models/medidor.models';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionService {

  constructor(private http:HttpClient) { }

  listarPaginacion(pageNumber:number = 1,limit:number = 8): Observable<PaginationModel<Suscripcion>>{
    const params = new HttpParams().set('page', pageNumber.toString()).set('limit', limit.toString());
    return this.http.get<any>(GlobalComponent.suscripciones_listar,{ params }).pipe(
      map(response => {
        if(response.success){
          return response.data;
        }
        throw response.message;
      })
    );
  }


  listarPaginacionDeMedidoresDeLaSuscripcion(pageNumber:number = 1,limit:number = 8,suscripcionId:number): Observable<PaginationModel<Medidor>>{
    const url = `${GlobalComponent.medidores_listar}${suscripcionId}`;
    const params = new HttpParams().set('page', pageNumber.toString()).set('limit', limit.toString()).set('id',suscripcionId);
    return this.http.get<any>(url,{ params }).pipe(
      map(response => {
        if(response.success){
          const facturaArray = response.data.data.map((facturaData: any) => new Medidor(
            facturaData.id,
            new Date(facturaData.fecha),  // Puedes necesitar ajustar cómo se convierte la fecha
            facturaData.cantidad_medido,
            facturaData.monto,
            facturaData.mes,
            facturaData.detalle,
            facturaData.usuarioId,
            facturaData.servicioId
          ));
          response.data.data = facturaArray;
          return response.data;
        }
        throw response.message;
      })
    );
  }


  async crearSuscripcion(usuarioId:number,servicioId:number,tipo:string, monto:number,tieneMedidor:boolean,fechaDeuda: string|null){
    let params = new HttpParams()
    .set('servicioid', servicioId)
    .set('usuarioid', usuarioId)
    .set('tipo', tipo)
    .set('monto', monto)
    .set('tiene_medidor', tieneMedidor);
    if(fechaDeuda){
      params = params.set('fecha_deuda', fechaDeuda)
    }
    let response = await this.http.post<any>(GlobalComponent.suscripciones_crear,params).toPromise();
    if(response.success){
      return response;
    }
    throw response.message;
  }

  async updateSuscripcion(id:number,usuarioId:number,servicioId:number,tipo:string, monto:number,tieneMedidor:boolean,fechaDeuda: string|null){
    let params = new HttpParams()
    .set('servicioid', servicioId)
    .set('usuarioid', usuarioId)
    .set('tipo', tipo)
    .set('monto', monto)
    .set('tiene_medidor', tieneMedidor);
    if(fechaDeuda){
      params = params.set('fecha_deuda', fechaDeuda)
    }
    let response = await this.http.put<any>(GlobalComponent.suscripciones_actualizar.replace(":id",id.toString()),params).toPromise();
    if(response.success){
      return response;
    }
    throw response.message;
  }

  async crearMedidorDeSuscripcion(
    usuarioId:number,
    servicioId:number,
    fecha:Date,
    cantidadMedido:number,
    monto:number,
    mes:number,
    detalle:string
    ){
    let date = fecha.toISOString().split('T')[0];
    const params = new HttpParams()
    .set('servicioId', servicioId)
    .set('usuarioId', usuarioId)
    .set('monto', monto)
    .set('fecha', date)
    .set('cantidad_medido', cantidadMedido)
    .set('detalle', detalle)
    .set('mes', mes);
    let response = await this.http.post<any>(GlobalComponent.medidores_crear,params).toPromise();
    if(response.success){
      return response;
    }
    throw response.message;
  }

  async eliminar(id:number) {
    const url = `${GlobalComponent.suscripciones_eliminar}${id}`;
    let response =  await this.http.delete<any>(url).toPromise();
    if(response.success){
      return (String)(response.message);
    }else{
      throw (String)(response.message);
    }
  }

  async subscribeToService(id:number) {
    const url = `${GlobalComponent.suscripciones_activate}`.replace(":id",id.toString());
    let response =  await this.http.put<any>(url,null).toPromise();
    if(response.success){
      return (String)(response.message);
    }else{
      throw (String)(response.message);
    }
  }

  async unsubscribeToService(id:number) {
    const url = `${GlobalComponent.suscripciones_disabled}`.replace(":id",id.toString());
    let response =  await this.http.put<any>(url,null).toPromise();
    if(response.success){
      return (String)(response.message);
    }else{
      throw (String)(response.message);
    }
  }
}
