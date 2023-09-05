export class Servicio{
  constructor(
    public id: number,
    public nombre: string,
    public estado: number,
    public asociar: null,
    public monto_por_servicio:number=0,
  ) {}

  public getestado (){
    return this.estado?"Activo":"Inactivo";
  }
}
