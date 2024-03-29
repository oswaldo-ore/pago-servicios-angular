import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private datos: any;
  constructor() {}
  setDatos(datos: any) {
    this.datos = datos;
  }

  getDatos() {
    return this.datos;
  }
}
