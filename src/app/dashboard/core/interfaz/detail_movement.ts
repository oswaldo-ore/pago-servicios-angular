import { DetailUserFacture } from './detail_user_facture';
export interface DetailMovement {
  id: number;
  detalleusuariofacturaid: number;
  movimientoid: number;
  monto: number;
  descripcion: string | null;
  fecha: Date;
  DetalleUsuarioFactura: DetailUserFacture;
}
