import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { PaginationModel } from '../interfaz/pagination.model';
import { Observable, map } from 'rxjs';
import { GlobalComponent } from 'src/app/utils/global-component';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  getPaginacion(pageNumber:number = 1,limit:number = 8): Observable<PaginationModel<Usuario>> {
    const params = new HttpParams().set('page', pageNumber.toString()).set('limit', limit.toString());
    return this.http.get<any>(GlobalComponent.usuarios_listar,{ params }).pipe(
      map(response => {
        if(response.success){
          return response.data;
        }
        throw response.message;
      })
    );
  }

  async crearUsuario(nombre:string,apellidos:string){
    const params = new HttpParams().set('nombre', nombre).set('apellidos', apellidos);
    let response = await this.http.post<any>(GlobalComponent.usuarios_crear,params).toPromise();
    if(response.success){
      return response;
    }
    throw response.message;
  }

  async eliminar(id:number) {
    const url = `${GlobalComponent.usuarios_eliminar}${id}`;
    let response =  await this.http.delete<any>(url).toPromise();
    if(response.success){
      return (String)(response.message);
    }else{
      throw (String)(response.message);
    }
  }
}
