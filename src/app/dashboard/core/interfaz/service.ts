export interface Service{
  id: number;
  nombre: string;
  estado: number;
  asociar: null;
  monto_por_servicio:number;
  getestado: Function;
}
