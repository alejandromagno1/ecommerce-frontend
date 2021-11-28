import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Control Votación',
    icon: 'shield-outline',
    link: '/pages/controlVotes',
    home: true,
  },
  {
    title: 'Votación',
    icon: 'shopping-bag-outline',
    link: '/pages/votes',
    home: true,
  },
  {
    title: 'Preguntas',
    icon: 'question-mark-circle-outline',
    link: '/pages/questions',
    home: true,
  },
  {
    title: 'Respuestas',
    icon: 'checkmark-circle-outline',
    link: '/pages/answers',
    home: true,
  },
  {
    title: 'Usuarios',
    icon: 'people-outline',
    link: '/pages/users',
    home: true,
  },
  {
    title: 'Agencias',
    icon: 'map-outline',
    link: '/pages/agencies',
    home: true,
  },
  {
    title: 'Roles',
    icon: 'layers-outline',
    link: '/pages/roles',
    home: true,
  },
];

export const MENU_ITEMS_BAS: NbMenuItem[] = [
  {
    title: 'Votación',
    icon: 'shopping-bag-outline',
    link: '/pages/votes',
    home: true,
  }
];