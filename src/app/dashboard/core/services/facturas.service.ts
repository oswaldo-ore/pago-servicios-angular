import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationModel } from '../interfaz/pagination.model';
import { Observable, map } from 'rxjs';
import { GlobalComponent } from 'src/app/utils/global-component';
import { Factura } from '../models/factura.models';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  constructor(private http: HttpClient) { }

  getPaginacion(pageNumber: number = 1, limit: number = 8): Observable<PaginationModel<Factura>> {
    const params = new HttpParams().set('page', pageNumber.toString()).set('limit', limit.toString());
    return this.http.get<any>(GlobalComponent.facturas_listar, { params }).pipe(
      map(response => {
        if (response.success) {
          const facturaArray = response.data.data.map((facturaData: any) => new Factura(
            facturaData.id,
            facturaData.monto,
            new Date(facturaData.fecha),  // Puedes necesitar ajustar cómo se convierte la fecha
            facturaData.notifico,
            facturaData.visto,
            facturaData.foto_factura,
            facturaData.servicioid,
            facturaData.Servicio,
            facturaData.DetalleUsuarioFacturas
          ));
          response.data.data = facturaArray;
          return response.data;
        }
        throw response.message;
      })
    );
  }

  async crear(servicio: number, monto: number, fecha: Date, imagen: File)  {
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

  async eliminar(id:number) {
    const url = `${GlobalComponent.facturas_eliminar}${id}`;
    let response =  await this.http.delete<any>(url).toPromise();
    if(response.success){
      return (String)(response.message);
    }else{
      throw (String)(response.message);
    }
  }
}
