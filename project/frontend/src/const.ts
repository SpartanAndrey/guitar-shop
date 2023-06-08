export enum AppRoute {
  Main = '/',
  Register = '/register',
  Add = '/add',
  Edit = '/edit/:id',
  Catalog = '/products',
  Product = '/products/:id',
  NotFound ='*',
}

export enum AuthorizationStatus {
  Admin = 'ADMIN',
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum SortType {
  Default = 'Date: new to old',
  PriceUp = 'Price: low to high',
  PriceDown = 'Price: high to low'
}

export const GUITAR_TYPES = [
  {title: 'Акустическая гитара', value: 'guitar'},
  {title: 'Электрогитара', value: 'el-guitar'},
  {title: 'Укулеле', value: 'ukulele'},
];

export enum Cord {
  Four = '4',
  Six = '6',
  Seven = '7',
  Twelve = '12',
}
