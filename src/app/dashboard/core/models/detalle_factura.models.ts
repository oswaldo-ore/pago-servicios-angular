import { Factura } from "./factura.models";
import { Servicio } from "./servicios.model";
import { Usuario } from "./usuario.model";

export class DetalleUsuarioFacturas{
  static PENDIENTE = 0;
  static PRESTADO = 1;
  static COMPLETADO = 2;
  constructor(
    public id: number,
    public monto: number,
    public estado: number,
    public monto_pago: number,
    public cambio_pago:number,
    public facturaid:number,
    public fecha: Date,
    public fecha_pago: Date|null,
    public notificar: boolean,
    public visto: number,
    public servicioid : number,
    public usuarioid : number,
    public Usuario: Usuario,
    public Servicio: Servicio|null=null,
    public Factura: Factura|null=null,
  ) {}

  //map:string
  static fromJson(detalle: any) {
    return new DetalleUsuarioFacturas(
      detalle.id,
      detalle.monto,
      detalle.estado,
      detalle.monto_pago,
      detalle.cambio_pago,
      detalle.facturaid,
      new Date(detalle.fecha),
      detalle.fecha_pago ? new Date(detalle.fecha_pago) : null,
      detalle.notificar,
      detalle.visto,
      detalle.servicioid,
      detalle.usuarioid,
      new Usuario(detalle.Usuario.id, detalle.Usuario.nombre, detalle.Usuario.apellidos, detalle.Usuario.estado),
      new Servicio(detalle.Servicio.id, detalle.Servicio.nombre, detalle.Servicio.estado, detalle.Servicio.asociar),
      (detalle.Factura == null) ? null : new Factura(
        detalle.Factura.id,
        detalle.Factura.monto,
        new Date(detalle.Factura.fecha),
        detalle.Factura.ispagado,
        detalle.Factura.notifico,
        detalle.Factura.visto,
        detalle.Factura.estado,
        detalle.Factura.foto_factura,
        detalle.Factura.servicioid,
        new Servicio(detalle.Servicio.id, detalle.Servicio.nombre, detalle.Servicio.estado, detalle.Servicio.asociar),
        []
      ),
    );
  }

  public estadoString() {
    if(this.estado == DetalleUsuarioFacturas.PENDIENTE){
      return "Pendiente";
    }
    if(this.estado == DetalleUsuarioFacturas.PRESTADO){
      return "Prestado";
    }
    return "Cancelado"
  }

  public estadoBadge(){
    if(this.estado == DetalleUsuarioFacturas.PENDIENTE){
      return "badge bg-danger-subtle text-danger";
    }
    if(this.estado == DetalleUsuarioFacturas.PRESTADO){
      return "badge bg-info-subtle text-info";
    }
    return "badge bg-success-subtle text-success";
  }

  public isCancelado(){
    return this.estado == DetalleUsuarioFacturas.COMPLETADO;
  }

  public isPendiente(){
    return this.estado == DetalleUsuarioFacturas.PENDIENTE;
  }

  public isPrestado(){
    return this.estado == DetalleUsuarioFacturas.PRESTADO;
  }

  public saldoRestante(){
    return this.monto - this.monto_pago;
  }
}
