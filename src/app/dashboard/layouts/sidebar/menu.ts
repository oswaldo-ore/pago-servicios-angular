import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENÚ',
    isTitle: true
  },
  {
    id: 0,
    label: 'Dashboard',
    icon: 'ri-dashboard-line',
    link: '/admin'
  },
  {
    id: 2,
    label: 'Configuración',
    icon: ' ri-settings-5-line',
    subItems: [
      {
        id: 3,
        label: 'Servicios',
        link: '/admin/servicios',
        parentId: 2
      },
      {
        id: 4,
        label: 'Clientes',
        link: '/admin/usuarios',
        parentId: 2
      },
      {
        id: 5,
        label: 'Suscripciones',
        link: '/admin/suscripciones',
        parentId: 2
      },
      {
        id: 6,
        label: 'Whatsapp',
        link: '/admin/whatsapp',
        parentId: 2
      },
      {
        id: 7,
        label: 'Configuración',
        link: '/admin/veripagos',
        parentId: 2
      },
    ]
  },
  {
    id: 7,
    label: 'Registro pagos',
    icon: 'ri-apps-2-line',
    subItems: [
      {
        id: 8,
        label: 'Facturas',
        link: '/admin/facturas',
        parentId: 7
      },
    ]
  },
  {
    id: 9,
    label: 'Informes',
    icon: 'ri-article-line',
    subItems: [
      {
        id: 10,
        label: 'Deudas Mensuales',
        link: '/admin/deudas-mensuales',
        parentId: 9
      },
    ]
  },

];
