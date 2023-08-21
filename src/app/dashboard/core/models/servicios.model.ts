export class Servicio{
  constructor(
    public id: number,
    public nombre: string,
    public estado: number,
    public asociar: null
  ) {}

  public getestado (){
    return this.estado?"Activo":"Inactivo";
  }
}
