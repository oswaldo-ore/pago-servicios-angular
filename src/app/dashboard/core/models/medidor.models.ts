export class Medidor {
  constructor(
    public id: number,
    public fecha: Date,
    public cantidad_medido: number,
    public monto: number,
    public mes: string,
    public detalle: string,
    public usuarioId: number,
    public servicioId: number,
  ) {}
}
