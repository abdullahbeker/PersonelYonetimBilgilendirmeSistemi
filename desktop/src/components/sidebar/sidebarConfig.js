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
    _children: ['Sayfalar'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Anasayfa',
    to: '/pages/home',
    icon: 'cil-home',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Hakkımızda',
    to: '/pages/aboutus',
    icon: 'cil-info',
  },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Ürünlerimiz",
  //   to: "/pages/products",
  //   icon: "cil-basket",
  // },
  {
    _tag: "CSidebarNavItem",
    name: "Referanslar",
    to: "/pages/referances",
    icon: "cil-happy",
  },
  {
    _tag: "CSidebarNavItem",
    name: "İletişim",
    to: "/pages/contact",
    icon: "cil-contact",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["KATEGORİLER"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Kategorileri Listele",
    to: "/categories",
    icon: "cil-list-numbered",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Yeni Kategori",
    to: "/categories/new",
    icon: "cil-playlist-add",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["ÜRÜNLER"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Ürünleri Listele",
    to: "/products",
    icon: "cil-list-numbered",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Yeni Ürün",
    to: "/products/new",
    icon: "cil-playlist-add",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["DİLLER"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Dilleri Listele",
    to: "/langs",
    icon: "cil-list-numbered",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Yeni Dil",
    to: "/langs/new",
    icon: "cil-playlist-add",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["KULLANICILAR"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Kullanıcıları Listele",
    to: "/users",
    icon: "cil-list-numbered",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Yeni Kullanıcı",
    to: "/users/new",
    icon: "cil-playlist-add",
  },
];

