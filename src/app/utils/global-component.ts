import { environment } from '../../environments/environment';
// const URL_BASE = "http://127.0.0.1:3000/api/";
const URL_BASE = environment.apiUrl;
export const GlobalComponent = {
  // API_URL : "http://127.0.0.1:3000",
  // API_URL : "https://servicios.tecnosoft.xyz",
  API_URL: environment.apiUrlImage,
  headerToken: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  AUTH_API: URL_BASE + 'admin/login',
  LOGOUT_API: URL_BASE + 'admin/logout',
  servicio_listar: URL_BASE + 'admin/servicios/listar',
  servicio_listar_todos: URL_BASE + 'admin/servicios/listar-todo',
  servicio_crear: URL_BASE + 'admin/servicios/crear',
  servicio_eliminar: URL_BASE + 'admin/servicios/',

  usuarios_listar: URL_BASE + 'admin/usuarios/listar',
  usuarios_listar_todos: URL_BASE + 'admin/usuarios/listar-todo',
  usuarios_crear: URL_BASE + 'admin/usuarios/crear',
  usuarios_update: URL_BASE + 'admin/usuarios/:id',
  usuarios_eliminar: URL_BASE + 'admin/usuarios/',
  usuarios_listar_deudas: URL_BASE + 'admin/usuarios/:id/deudas',
  usuarios_listar_deudas_paginate:
    URL_BASE + 'admin/usuarios/:id/deudas-paginate',
  usuarios_create_debt: URL_BASE + 'admin/usuarios/:id/create-debt',
  usuarios_pagar_deudas: URL_BASE + 'admin/usuarios/:id/pagar',
  usuarios_notify_deuda: URL_BASE + 'admin/usuarios/:id/notify-deudas',
  usuarios_movements: URL_BASE + 'admin/usuarios/:id/movements',

  suscripciones_listar: URL_BASE + 'admin/suscripciones/listar',
  suscripciones_crear: URL_BASE + 'admin/suscripciones/crear',
  suscripciones_actualizar: URL_BASE + 'admin/suscripciones/:id',
  suscripciones_activate: URL_BASE + 'admin/suscripciones/:id/activar',
  suscripciones_disabled: URL_BASE + 'admin/suscripciones/:id/desactivar',
  suscripciones_eliminar: URL_BASE + 'admin/suscripciones/',

  facturas_listar: URL_BASE + 'admin/facturas/listar',
  facturas_crear: URL_BASE + 'admin/facturas/crear',
  facturas_eliminar: URL_BASE + 'admin/facturas/',
  facturas_show: URL_BASE + 'admin/factura/',
  factura_prestar: URL_BASE + 'admin/factura/:id/estado-prestado',

  medidores_listar: URL_BASE + 'admin/suscripciones/medidores/',
  medidores_crear: URL_BASE + 'admin/medidores/crear',

  detalle_factura_pagar: URL_BASE + 'admin/detalle/factura/pagar',
  detalle_factura_devolver: URL_BASE + 'admin/detalle/factura/devolver',
  deudas_mensuales: URL_BASE + 'admin/deudas-mensuales',

  prepayment_save: URL_BASE + 'admin/prepayment/register',
  prepayment_list: URL_BASE + 'admin/prepayment/list',

  configuracion: URL_BASE + 'admin/configuracion',
  configuracion_generar_qr: URL_BASE + 'admin/configuracion/getCodigoQr',
  configuracion_verificar_qr: URL_BASE + 'admin/configuracion/verificarQr',
  configuracion_actualizar_veripagos:
    URL_BASE + 'admin/configuracion/updateVeripagos',
  configuracion_terminar_conexion: URL_BASE + 'admin/configuracion/desconectar',
  //user
  user_verify: URL_BASE + 'verify-user',
  user_services: URL_BASE + ':code/services',
  user_debts: URL_BASE + ':code/deudas',
  user_debts_generate_qr: URL_BASE + 'deudas/generate-qr',
  user_debts_verify_payment: URL_BASE + ':movement_id/verify-payment',
};
