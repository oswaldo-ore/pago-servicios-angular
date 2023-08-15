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
        id: 3,
        label: 'Deudas',
        link: '',
        parentId: 2
      },
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
    label: 'Administración',
    icon: 'ri-apps-2-line',
    subItems: [
      {
        id: 9,
        label: 'Factura',
        link: '/calendar',
        parentId: 8
      },
      {
        id: 10,
        label: 'Medidores',
        link: '/chat',
        parentId: 8
      }
    ]
  },

];
