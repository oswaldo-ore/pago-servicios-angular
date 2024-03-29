import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GlobalComponent } from 'src/app/utils/global-component';
import { PaginationModel } from '../interfaz/pagination.model';
import { Servicio } from '../models/servicios.model';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http: HttpClient) {}
  getAll(): Observable<Servicio[]> {
    return this.http.get<any>(GlobalComponent.servicio_listar_todos).pipe(
      map(response => {
        if(response.success){
          return response.data;
        }
        throw response.message;
      })
    );
  }

  getAllByUser(id:number): Observable<Servicio[]> {
    const params = new HttpParams().set('userId', id.toString());
    return this.http.get<any>(GlobalComponent.servicio_listar_todos,{ params }).pipe(
      map(response => {
        if(response.success){
          return response.data;
        }
        throw response.message;
      })
    );
  }
  getPaginacion(pageNumber:number = 1,limit:number = 8): Observable<PaginationModel<Servicio>> {
    const params = new HttpParams().set('page', pageNumber.toString()).set('limit', limit.toString());
    return this.http.get<any>(GlobalComponent.servicio_listar,{ params }).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  async guardar(nombre:string,asociar_id:any){
    const params = new HttpParams()
      .set('nombre', nombre)
      .set('asociar', asociar_id);
    let response =  await this.http.post<any>(GlobalComponent.servicio_crear,params).toPromise();
    if(response.success){
      return response;
    }else{
      throw response.message;
    }
  }

  async eliminar(id:number) {
    const url = `${GlobalComponent.servicio_eliminar}${id}`;
    let response =  await this.http.delete<any>(url).toPromise();
    if(response.success){
      return (String)(response.message);
    }else{
      throw (String)(response.message);
    }
  }

  async getServicesUserByCode(code:string){
    const url = `${GlobalComponent.user_services.replace(':code',code)}`;
    let response =  await this.http.get<any>(url).toPromise();
    if(response.success){
      return response.data;
    }else{
      throw response.message;
    }
  }
}
