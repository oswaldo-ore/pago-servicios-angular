import { Usuario } from "./usuario.model";

export class DetalleUsuarioFacturas{
  constructor(
    public id: number,
    public monto: number,
    public monto_pago: number,
    public cambio_pago:number,
    public facturaid:number,
    public fecha: Date,
    public fecha_pago: null,
    public notificar: boolean,
    public visto: number,
    public servicioid : number,
    public usuarioid : number,
    public Usuario: Usuario,
  ) {}
}
