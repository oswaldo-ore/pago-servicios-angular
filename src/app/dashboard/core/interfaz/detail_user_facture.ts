import { Service } from "./service";

export interface DetailUserFacture {
  id: number;
  monto: number;
  estado: number;
  monto_pago: number;
  cambio_pago: number;
  facturaid: number;
  fecha: Date;
  fecha_pago: Date | null;
  notificar: boolean;
  visto: number;
  servicioid: number;
  usuarioid: number;
  Servicio: Service | null;
}
