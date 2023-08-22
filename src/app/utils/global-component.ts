const URL_BASE = "http://127.0.0.1:3000/api/";
// const URL_BASE = "https://servicios.tecnosoft.website/api/";
export const GlobalComponent = {
    API_URL : 'http://127.0.0.1:3000/api/',

    headerToken : {'Authorization': `Bearer ${localStorage.getItem('token')}`},
    AUTH_API: URL_BASE + "admin/login",
    LOGOUT_API: URL_BASE + "admin/logout",
    servicio_listar: URL_BASE + 'servicios/listar',
    servicio_crear: URL_BASE + 'servicios/crear',
    servicio_eliminar: URL_BASE + 'servicios/',

    usuarios_listar: URL_BASE + 'usuarios/listar',
    usuarios_crear: URL_BASE + 'usuarios/crear',
    usuarios_eliminar: URL_BASE + 'usuarios/',
}
