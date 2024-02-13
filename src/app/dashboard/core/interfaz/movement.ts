import { DetailMovement } from './detail_movement';
export interface Movements {
  id: number;
  usuarioid: number;
  monto: number;
  descripcion: string | null;
  saldo_anterior: number;
  a_cuenta: number;
  fecha: Date;
  DetallesMovimiento: DetailMovement[];
}
