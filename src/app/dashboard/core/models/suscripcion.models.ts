import { Servicio } from "./servicios.model";
import { Usuario } from "./usuario.model";

export class Suscripcion{
  constructor(
    public id: number,
    public tipo: string,
    public monto: number,
    public tiene_medidor: boolean,
    public habilitado:boolean,
    public usuarioid:number,
    public servicioid:number,
    public Servicio: Servicio,
    public Usuario: Usuario,
  ) {}
}
