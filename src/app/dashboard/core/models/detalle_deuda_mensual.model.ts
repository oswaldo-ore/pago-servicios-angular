import { Usuario } from "./usuario.model";
import { Servicio } from "./servicios.model";
export class DetalleDeudaMensual {
  constructor(
    public id: number,
    public monto: number,
    public monto_pago: number,
    public monto_debe: number,
    public usuarioid: number,
    public servicioid: number,
    public deuda_mensual_id: number,
    public fecha: Date,
    public mes: string,
    public Servicio: Servicio,
  ) { }
}

