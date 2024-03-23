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
    link: '/'
  },
  {
    id: 2,
    label: 'Configuración',
    icon: ' ri-settings-5-line',
    subItems: [
      {
        id: 3,
        label: 'Servicios',
        link: '/servicios',
        parentId: 2
      },
      {
        id: 4,
        label: 'Clientes',
        link: '/usuarios',
        parentId: 2
      },
      {
        id: 5,
        label: 'Suscripciones',
        link: '/suscripciones',
        parentId: 2
      },
      {
        id: 6,
        label: 'Whatsapp',
        link: '/whatsapp',
        parentId: 2
      },
      {
        id: 7,
        label: 'Configuración',
        link: '/veripagos',
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
        link: '/facturas',
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
        link: '/deudas-mensuales',
        parentId: 9
      },
    ]
  },

];
