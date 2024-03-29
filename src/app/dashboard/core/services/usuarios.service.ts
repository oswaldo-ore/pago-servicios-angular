import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { PaginationModel } from '../interfaz/pagination.model';
import { Observable, map } from 'rxjs';
import { GlobalComponent } from 'src/app/utils/global-component';
import { DetalleUsuarioFacturas } from '../models/detalle_factura.models';
import { Servicio } from '../models/servicios.model';
import { Factura } from '../models/factura.models';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Usuario[]> {
    return this.http.get<any>(GlobalComponent.usuarios_listar_todos).pipe(
      map(response => {
        if (response.success) {
          return response.data;
        }
        throw response.message;
      })
    );
  }

  getPaginacion(pageNumber: number = 1, limit: number = 8): Observable<PaginationModel<Usuario>> {
    const params = new HttpParams().set('page', pageNumber.toString()).set('limit', limit.toString());
    return this.http.get<any>(GlobalComponent.usuarios_listar, { params }).pipe(
      map(response => {
        if (response.success) {
          return response.data;
        }
        throw response.message;
      })
    );
  }

  async crearUsuario(nombre: string, apellidos: string,codPais: string,telefono:string) {
    const params = new HttpParams()
    .set('nombre', nombre)
    .set('apellidos', apellidos)
    .set('cod_pais', codPais)
    .set('telefono', telefono);
    let response = await this.http.post<any>(GlobalComponent.usuarios_crear, params).toPromise();
    if (response.success) {
      return response;
    }
    throw response.message;
  }

  async payUserDebtDynamic(usuarioId:number, monto: number,descripcion: string) {
    const params = new HttpParams()
    .set('monto', monto).set('detalle',descripcion);
    let response = await this.http.post<any>(GlobalComponent.usuarios_pagar_deudas.replace(":id",usuarioId.toString()), params).toPromise();
    if (response.success) {
      return response;
    }
    throw response.message;
  }

  async updateUsuario(id:number,nombre: string, apellidos: string,codPais: string,telefono:string) {
    const params = new HttpParams()
    .set('nombre', nombre)
    .set('apellidos', apellidos)
    .set('cod_pais', codPais)
    .set('telefono', telefono);
    let response = await this.http.put<any>(GlobalComponent.usuarios_update.replace(":id",id.toString()) , params).toPromise();
    if (response.success) {
      return response;
    }
    throw response.message;
  }

  async eliminar(id: number) {
    const url = `${GlobalComponent.usuarios_eliminar}${id}`;
    let response = await this.http.delete<any>(url).toPromise();
    if (response.success) {
      return (String)(response.message);
    } else {
      throw (String)(response.message);
    }
  }

  async detalleDeudasUsuario(usuarioId: number) {
    try {
      const url = GlobalComponent.usuarios_listar_deudas.replace(':id', usuarioId.toString());
      let response = await this.http.get<any>(url).toPromise();
      if(!response.success){
        throw response.message;
      }
      let deudas: DetalleUsuarioFacturas[]= [];
      let pagos : DetalleUsuarioFacturas[]= [];
      response?.data?.deuda.map((detalle: any) => {
          let deuda = new DetalleUsuarioFacturas(
            detalle.id,
            detalle.monto,
            detalle.estado,
            detalle.monto_pago,
            detalle.cambio_pago,
            detalle.facturaid,
            new Date(detalle.fecha),
            detalle.fecha_pago ? new Date(detalle.fecha_pago) : null,
            detalle.notificar,
            detalle.visto,
            detalle.servicioid,
            detalle.usuarioid,
            new Usuario(detalle.Usuario.id, detalle.Usuario.nombre, detalle.Usuario.apellidos, detalle.Usuario.estado),
            new Servicio(detalle.Servicio.id, detalle.Servicio.nombre, detalle.Servicio.estado, detalle.Servicio.asociar),
            (detalle.Factura == null) ? null : new Factura(
              detalle.Factura.id,
              detalle.Factura.monto,
              new Date(detalle.Factura.fecha),
              detalle.Factura.ispagado,
              detalle.Factura.notifico,
              detalle.Factura.visto,
              detalle.Factura.estado,
              detalle.Factura.foto_factura,
              detalle.Factura.servicioid,
              new Servicio(detalle.Servicio.id, detalle.Servicio.nombre, detalle.Servicio.estado, detalle.Servicio.asociar),
              []
            ),
          );
          deudas.push(deuda);
          return deuda;
      });
      response?.data?.pagadas.map((detalle: any) => {
        let pago =  new DetalleUsuarioFacturas(
          detalle.id,
          detalle.monto,
          detalle.estado,
          detalle.monto_pago,
          detalle.cambio_pago,
          detalle.facturaid,
          new Date(detalle.fecha),
          detalle.fecha_pago ? new Date(detalle.fecha_pago) : null,
          detalle.notificar,
          detalle.visto,
          detalle.servicioid,
          detalle.usuarioid,
          new Usuario(detalle.Usuario.id, detalle.Usuario.nombre, detalle.Usuario.apellidos, detalle.Usuario.estado),
          new Servicio(detalle.Servicio.id, detalle.Servicio.nombre, detalle.Servicio.estado, detalle.Servicio.asociar),
          detalle.Factura == null? null : new Factura(
            detalle.Factura.id,
            detalle.Factura.monto,
            new Date(detalle.Factura.fecha),
            detalle.Factura.ispagado,
            detalle.Factura.notifico,
            detalle.Factura.visto,
            detalle.Factura.estado,
            detalle.Factura.foto_factura,
            detalle.Factura.servicioid,
            new Servicio(detalle.Servicio.id, detalle.Servicio.nombre, detalle.Servicio.estado, detalle.Servicio.asociar),
            []
          ),
        );
        pagos.push(pago);
          return pago;
      });
      response.data.deuda=deudas;
      response.data.pagadas=pagos;
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  detalleDeudasUsuarioWithPaginate(usuarioId: number,pageNumber: number = 1, limit: number = 8,estado: number = 0): Observable<PaginationModel<DetalleUsuarioFacturas>>{
    const url = GlobalComponent.usuarios_listar_deudas_paginate.replace(':id', usuarioId.toString());
    let params = new HttpParams().set('page', pageNumber.toString()).set('limit', limit.toString()).set('state', estado.toString());
    return this.http.get<any>(url,{ params }).pipe(
      map( response => {
        if(!response.success){
          throw response.message;
        }
        const debs = response.data.data.map((detalle: any) => {
          return DetalleUsuarioFacturas.fromJson(detalle);
        });
        response.data.data = debs;
        return response.data;
      })
    );
  }

  async notifyDeuda(id: number) {
    let url = GlobalComponent.usuarios_notify_deuda.replace(":id",id.toString()) ;
    let response = await this.http.post<any>(url,{}).toPromise();
    if (response.success) {
      return response.message;
    }
    throw response.message;
  }

  async getMovementUser(id: number) {
    let url = GlobalComponent.usuarios_movements.replace(":id",id.toString()) ;
    let response = await this.http.get<any>(url).toPromise();
    if (response.success) {
      return response.data;
    }
    throw response.message;
  }

  async getMovementUserWithPaginate(id: number,pageNumber: number = 1, limit: number = 8) {
    const params = new HttpParams().set('page', pageNumber.toString()).set('limit', limit.toString());
    let url = GlobalComponent.usuarios_movements.replace(":id",id.toString())+"-v2" ;
    let response = await this.http.get<any>(url, { params }).toPromise();
    if (response.success) {
      console.log(response.data);
      return response.data;
    }
    throw response.message;
  }

  async createDebt(userId: number,monto: number,fecha: Date, servicioId: number) {
    const params = new HttpParams()
    .set('amount', monto.toString())
    .set('date', fecha.toISOString())
    .set('serviceId', servicioId.toString());
    let response = await this.http.post<any>(GlobalComponent.usuarios_create_debt.replace(":id",userId.toString()), params).toPromise();
    if (response.success) {
      return response.message;
    }
    throw response.message;

  }

  getDebtsUserByCode(code:string) : Observable<DetalleUsuarioFacturas[]>{
    const url = `${GlobalComponent.user_debts.replace(':code', code)}`;
    return this.http.get<any>(url).pipe(
      map( response => {
        if(!response.success){
          throw response.message;
        }
        const debs = response.data.map((detalle: any) => {
          return DetalleUsuarioFacturas.fromJson(detalle);
        });
        response.data = debs;
        return response.data;
      })
    );
  }

  async generateCodeQr(debs: number[]){
    let response = await this.http.post<any>(GlobalComponent.user_debts_generate_qr,{
      idsDeudas:debs,
    }).toPromise();
    if (response.success) {
      return response.data;
    }
    throw response.message;
  }

  async verifyCodeQr(movement_id: number){
    let url = GlobalComponent.user_debts_verify_payment.replace(':movement_id',movement_id.toString());
    let response = await this.http.post<any>(url,{}).toPromise();
    if (response.success) {
      return response.message;
    }
    throw response.message;
  }
}
