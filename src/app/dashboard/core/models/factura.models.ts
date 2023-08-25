import { GlobalComponent } from "src/app/utils/global-component";
import { DetalleUsuarioFacturas } from "./detalle_factura.models";
import { Servicio } from "./servicios.model";

export class Factura{
  constructor(
    public id: number,
    public monto: number,
    public fecha: Date,
    public ispagado:boolean,
    public notifico: number,
    public visto: number,
    public foto_factura: string,
    public servicioid : number,
    public Servicio: Servicio,
    public DetalleUsuarioFacturas: DetalleUsuarioFacturas[],
  ) {}

  public imagen(){
    return GlobalComponent.API_URL + this.foto_factura;
  }

  public isPagado(){
    return this.ispagado?"Cancelado":"Pendiente";
  }
}
