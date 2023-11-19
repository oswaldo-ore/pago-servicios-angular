import { DetalleDeudaMensual } from "./detalle_deuda_mensual.model";
import { Usuario } from "./usuario.model";
export class DeudaMensual {
  constructor(
    public id: number,
    public monto: number,
    public monto_pago: number,
    public monto_debe: number,
    public usuarioid: number,
    public fecha: Date,
    public mes: string,
    public Usuario: Usuario,
    public DetalleDeudaMensual: DetalleDeudaMensual[],
  ) { }
}
