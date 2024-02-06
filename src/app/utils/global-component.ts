import { environment } from '../../environments/environment';
// const URL_BASE = "http://127.0.0.1:3000/api/";
const URL_BASE = environment.apiUrl;
export const GlobalComponent = {
    // API_URL : "http://127.0.0.1:3000",
    // API_URL : "https://servicios.tecnosoft.xyz",
    API_URL : environment.apiUrlImage,
    headerToken : {'Authorization': `Bearer ${localStorage.getItem('token')}`},
    AUTH_API: URL_BASE + "admin/login",
    LOGOUT_API: URL_BASE + "admin/logout",
    servicio_listar: URL_BASE + 'servicios/listar',
    servicio_listar_todos: URL_BASE + 'servicios/listar-todo',
    servicio_crear: URL_BASE + 'servicios/crear',
    servicio_eliminar: URL_BASE + 'servicios/',

    usuarios_listar: URL_BASE + 'usuarios/listar',
    usuarios_listar_todos: URL_BASE + 'usuarios/listar-todo',
    usuarios_crear: URL_BASE + 'usuarios/crear',
    usuarios_update: URL_BASE + 'usuarios/:id',
    usuarios_eliminar: URL_BASE + 'usuarios/',
    usuarios_listar_deudas: URL_BASE + 'usuarios/:id/deudas',
    usuarios_pagar_deudas: URL_BASE + 'usuarios/:id/pagar',

    suscripciones_listar: URL_BASE + 'suscripciones/listar',
    suscripciones_crear: URL_BASE + 'suscripciones/crear',
    suscripciones_actualizar: URL_BASE + 'suscripciones/:id',
    suscripciones_eliminar: URL_BASE + 'suscripciones/',

    facturas_listar: URL_BASE + 'facturas/listar',
    facturas_crear: URL_BASE + 'facturas/crear',
    facturas_eliminar: URL_BASE + 'facturas/',
    facturas_show: URL_BASE + 'factura/',
    factura_prestar: URL_BASE + 'factura/:id/estado-prestado',

    medidores_listar: URL_BASE + 'suscripciones/medidores/',
    medidores_crear: URL_BASE + 'medidores/crear',

    detalle_factura_pagar: URL_BASE + 'detalle/factura/pagar',
    detalle_factura_devolver: URL_BASE + 'detalle/factura/devolver',
    deudas_mensuales: URL_BASE + 'deudas-mensuales',

    configuracion: URL_BASE + 'configuracion',
    configuracion_generar_qr: URL_BASE + 'configuracion/getCodigoQr',
    configuracion_verificar_qr: URL_BASE + 'configuracion/verificarQr',
    configuracion_actualizar_veripagos: URL_BASE + 'configuracion/updateVeripagos',
    configuracion_terminar_conexion: URL_BASE + 'configuracion/desconectar',



}
