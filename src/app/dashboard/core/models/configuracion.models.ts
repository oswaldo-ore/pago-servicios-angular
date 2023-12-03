export class Configuracion {
  constructor(
    public id: number = 0,
    public codigoPais: string = "",
    public numeroTelefono: string = "",
    public estado_conexion: boolean=false,
  ) {}

  public  estado() {
    return this.estado_conexion ? "Conectado":"No conectado";
  }
}
