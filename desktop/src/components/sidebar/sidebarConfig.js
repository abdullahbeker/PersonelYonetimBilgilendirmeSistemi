export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Panel',
    to: '/pannel',
    icon: 'cil-speedometer',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['İzinler'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'İzinler',
    to: '/leave',
    icon: 'cil-paper-plane',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Personel İzinleri',
    to: '/personnel-leaves',
    icon: 'cil-happy',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Personel İşlemleri'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Personelleri Listele',
    to: '/personnels',
    icon: 'cil-contact',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Personel Ekle',
    to: '/addPersonnel',
    icon: 'cil-user-follow',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Eğitim işlemleri'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Eğitim Oluştur',
    to: '/addtrain',
    icon: 'cil-playlist-add',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Eğitime Personel Ata',
    to: '/attendtrain',
    icon: 'cil-playlist-add',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Eğitimler',
    to: '/trains',
    icon: 'cil-list-numbered',
  },

  {
    _tag: 'CSidebarNavTitle',
    _children: ['Zimmet Yönetimi'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Zimmet Oluştur',
    to: '/addasset',
    icon: 'cil-list-numbered',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Zimmetleri Listele',
    to: '/assets',
    icon: 'cil-playlist-add',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Zimmet Ata',
    to: '/attendasset',
    icon: 'cil-playlist-add',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['DİLLER'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Dilleri Listele',
    to: '/langs',
    icon: 'cil-list-numbered',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Yeni Dil',
    to: '/langs/new',
    icon: 'cil-playlist-add',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['KULLANICILAR'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Kullanıcıları Listele',
    to: '/users',
    icon: 'cil-list-numbered',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Yeni Kullanıcı',
    to: '/users/new',
    icon: 'cil-playlist-add',
  },
]
