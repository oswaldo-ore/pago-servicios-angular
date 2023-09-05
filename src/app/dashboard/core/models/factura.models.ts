import { GlobalComponent } from "src/app/utils/global-component";
import { DetalleUsuarioFacturas } from "./detalle_factura.models";
import { Servicio } from "./servicios.model";

export class Factura{
  static PENDIENTE = 0;
  static PRESTADO = 1;
  static CANCELADO = 2;
  constructor(
    public id: number,
    public monto: number,
    public fecha: Date,
    public ispagado:boolean,
    public notifico: number,
    public visto: number,
    public estado: number,
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

  public estadoString(){
    if(this.estado == Factura.PENDIENTE){
      return "Pendiente";
    }
    if(this.estado == Factura.PRESTADO){
      return "Cancelado Prestado";
    }
    return "Cancelado"
  }

  public estadoBadge(){
    if(this.estado == Factura.PENDIENTE){
      return "badge bg-danger-subtle text-danger";
    }
    if(this.estado == Factura.PRESTADO){
      return "badge bg-info-subtle text-info";
    }
    return "badge bg-success-subtle text-success";
  }

  public isCancelado(){
    return this.estado == Factura.CANCELADO;
  }

  public isPendiente(){
    return this.estado == Factura.PENDIENTE;
  }

  public isPrestado(){
    return this.estado == Factura.PRESTADO;
  }

  public getIcono(): string {
    const extension = this.obtenerExtension(this.imagen());

    if (extension === 'pdf') {
      return 'assets/images/pdf.png'; // Ruta al ícono de PDF
    } else if (['jpeg', 'jpg', 'png'].includes(extension)) {
      return this.imagen() ; // Ruta al ícono de imagen
    } else {
      return ''; // Si no es PDF ni una imagen, puedes devolver una ruta de ícono predeterminada o una cadena vacía si no deseas mostrar un ícono.
    }
  }

  obtenerExtension(url: string): string {
    const partes = url.split('.');
    if (partes.length > 1) {
      return partes[partes.length - 1].toLowerCase();
    }
    return ''; // Si no se encuentra una extensión, puedes devolver una cadena vacía.
  }

}
