import { Servicio } from "./servicios.model";

export class Usuario{
  constructor(
    public id: number,
    public nombre: string,
    public apellidos: string,
    public estado: number,
    public Servicios: Servicio[],
  ) {}
}