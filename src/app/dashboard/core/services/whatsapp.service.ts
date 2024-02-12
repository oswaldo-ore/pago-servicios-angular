import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalComponent } from 'src/app/utils/global-component';
import { Configuracion } from '../models/configuracion.models';

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {

  constructor(private http: HttpClient) { }

  async getConfiguracion():Promise<Configuracion>{
    let response = await this.http.get<any>(GlobalComponent.configuracion).toPromise();
    if(!response.success){
      throw response.message;
    }
    let data = response.data;
    return new Configuracion(data.id,data.codigo_pais,data.numero_telefono,data.estado_conexion);
  }

  async getQrWhatsapp():Promise<String>{
    let response = await this.http.post<any>(GlobalComponent.configuracion_generar_qr,{}).toPromise();
    if(!response.success){
      throw response.message;
    }
    return response.data ? response.data.code_qr : "";
  }
  async verificarConexionQr():Promise<Configuracion>{
    let response = await this.http.post<any>(GlobalComponent.configuracion_verificar_qr,{}).toPromise();
    if(!response.success){
      throw response.message;
    }
    let data = response.data;
    return new Configuracion(data.id,data.codigo_pais,data.numero_telefono,data.estado_conexion);
  }
  async desconectar():Promise<Configuracion>{
    let response = await this.http.post<any>(GlobalComponent.configuracion_terminar_conexion,{}).toPromise();
    if(!response.success){
      throw response.message;
    }
    let data = response.data;
    return new Configuracion(data.id,data.codigo_pais,data.numero_telefono,data.estado_conexion);
  }
}
