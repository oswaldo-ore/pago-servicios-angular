import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuracion } from '../models/configuracion.models';
import { GlobalComponent } from 'src/app/utils/global-component';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracionService {
  constructor(private http: HttpClient) {}

  async getConfiguracion(): Promise<Configuracion> {
    let response = await this.http
      .get<any>(GlobalComponent.configuracion)
      .toPromise();
    if (!response.success) {
      throw response.message;
    }
    let data = response.data;
    return new Configuracion(
      data.id,
      data.codigo_pais,
      data.numero_telefono,
      data.estado_conexion,
      data.veripagos_secret_key,
      data.veripagos_username,
      data.veripagos_password
    );
  }

  async updateVeripagosConfiguracion(
    secretKey: string,
    username: string,
    password: string
  ): Promise<Configuracion> {
    let body = {
      secret_key: secretKey,
      username: username,
      password: password,
    };
    let response = await this.http
      .patch<any>(GlobalComponent.configuracion_actualizar_veripagos, body)
      .toPromise();
    if (!response.success) {
      throw response.message;
    }
    let data = response.data;
    return new Configuracion(
      data.id,
      data.codigo_pais,
      data.numero_telefono,
      data.estado_conexion,
      data.veripagos_secret_key,
      data.veripagos_username,
      data.veripagos_password
    );
  }
}
