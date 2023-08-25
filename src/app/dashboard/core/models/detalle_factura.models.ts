import { Usuario } from "./usuario.model";

export class DetalleUsuarioFacturas{
  constructor(
    public id: number,
    public monto: number,
    public monto_pago: number,
    public cambio_pago:number,
    public facturaid:number,
    public iscancelado:boolean,
    public isprestado:boolean,
    public fecha: Date,
    public fecha_pago: Date|null,
    public notificar: boolean,
    public visto: number,
    public servicioid : number,
    public usuarioid : number,
    public Usuario: Usuario,
  ) {}

  public isPrestado(){
    return this.isprestado?"Prestado":"No Prestado"
  }
}
