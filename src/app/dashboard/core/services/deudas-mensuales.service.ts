import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationModel } from '../interfaz/pagination.model';
import { Observable, map } from 'rxjs';
import { GlobalComponent } from 'src/app/utils/global-component';
import { DetalleDeudaMensual } from '../models/detalle_deuda_mensual.model';
import { DeudaMensual } from '../models/deuda_mensual.models';
import { Servicio } from '../models/servicios.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class DeudasMensualesService {

  constructor(private http: HttpClient) { }

  getPaginacion(date: string,pageNumber: number = 1, limit: number = 8): Observable<PaginationModel<DeudaMensual>> {
    const params = new HttpParams().set('page', pageNumber.toString()).set('limit', limit.toString()).set('date',date);
    return this.http.get<any>(GlobalComponent.deudas_mensuales, { params }).pipe(
      map(response => {
        if (response.success) {
          const facturaArray = response.data.data.map((deudaMensual: any) => new DeudaMensual(
            deudaMensual.id,
            deudaMensual.monto,
            deudaMensual.monto_pago,
            deudaMensual.monto_debe,
            deudaMensual.usuarioid,
            new Date(deudaMensual.fecha),
            deudaMensual.mes,
            new Usuario(
              deudaMensual.Usuario.id,
              deudaMensual.Usuario.nombre,
              deudaMensual.Usuario.apellidos,
              deudaMensual.Usuario.estado,
              [],
              0,
              deudaMensual.Usuario.cod_pais,
              deudaMensual.Usuario.telefono,
            ),
            deudaMensual.DetalleDeudaMensuales.map(
              (detalle: { id: number; monto: number; monto_pago: number; monto_debe: number;
                usuarioid: number; fecha: string | number | Date; deuda_mensual_id: number;
                mes:string,
                servicioid: number; Servicio: { id: number; nombre: string;estado:number,
                  asociar: null};
              })=>{
              return new DetalleDeudaMensual(
                detalle.id,
                detalle.monto,
                detalle.monto_pago,
                detalle.monto_debe,
                detalle.usuarioid,
                detalle.servicioid,
                detalle.deuda_mensual_id,
                new Date(detalle.fecha),
                detalle.mes,
                new Servicio(
                  detalle.Servicio.id,
                  detalle.Servicio.nombre,
                  detalle.Servicio.estado,
                  detalle.Servicio.asociar
                  ),
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
}
