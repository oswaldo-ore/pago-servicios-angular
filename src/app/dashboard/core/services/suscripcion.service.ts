import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationModel } from '../interfaz/pagination.model';
import { Observable, map } from 'rxjs';
import { GlobalComponent } from 'src/app/utils/global-component';
import { Suscripcion } from '../models/suscripcion.models';

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


  async crearSuscripcion(usuarioId:number,servicioId:number,tipo:string, monto:number,tieneMedidor:boolean){
    const params = new HttpParams()
    .set('servicioid', servicioId)
    .set('usuarioid', usuarioId)
    .set('tipo', tipo)
    .set('monto', monto)
    .set('tiene_medidor', tieneMedidor);
    let response = await this.http.post<any>(GlobalComponent.suscripciones_crear,params).toPromise();
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
}
