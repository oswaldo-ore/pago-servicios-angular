import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENÚ',
    isTitle: true
  },
  {
    id: 2,
    label: 'Configuración',
    icon: ' ri-settings-5-line',
    subItems: [
      {
        id: 4,
        label: 'Servicios',
        link: '/servicios',
        parentId: 2
      },
      {
        id: 5,
        label: 'Clientes',
        link: '/usuarios',
        parentId: 2
      },
      {
        id: 6,
        label: 'Suscripciones',
        link: '/suscripciones',
        parentId: 2
      },
    ]
  },
  {
    id: 8,
    label: 'Registro pagos',
    icon: 'ri-apps-2-line',
    subItems: [
      {
        id: 9,
        label: 'Facturas',
        link: '/facturas',
        parentId: 8
      },
    ]
  },

];
