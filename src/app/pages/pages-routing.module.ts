import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

import { NgxLoginComponent } from './auth/login/login.component';
import { ProductsComponent } from './products/pages/products.component';
import { WishesComponent } from './wishes/pages/wishes.component';
import { ShoppingComponent } from './shopping/pages/shopping.component';
import { UsersComponent } from './users/pages/users.component';
import { RolesComponent } from './roles/pages/roles.component';
import { LinesComponent } from './lines/pages/lines.component';
import { AdminProdComponent } from './adminProd/pages/adminProd.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [

    {
      path: 'auth',
      component: NgxLoginComponent,
    },
    {
      path: 'products',
      component: ProductsComponent,
    },
    {
      path: 'wishes',
      component: WishesComponent,
    },
    {
      path: 'shopping',
      component: ShoppingComponent,
    },
    {
      path: 'users',
      component: UsersComponent,
    },
    {
      path: 'roles',
      component: RolesComponent,
    },
    {
      path: 'lines',
      component: LinesComponent,
    },
    {
      path: 'adminProd',
      component: AdminProdComponent,
    },
    {
      path: '',
      redirectTo: 'auth',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}