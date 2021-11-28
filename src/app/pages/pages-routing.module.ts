import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

import { ProductsComponent } from './products/pages/products.component';

// import { QuestionsComponent } from './lines/pages/questions.component';
// import { AgenciesComponent } from './adminProd/pages/agencies.component';
// import { UserVotesComponent } from './shopping/pages/userVotes.component';
// import { ControlVotesComponent } from './wishes/pages/controlVotes.component';

// import { RolesComponent } from './roles/pages/roles.component';
// import { UsersComponent } from './users/pages/users.component';
// import { InitialComponent } from './initial/pages/initial.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [

    {
      path: 'products',
      component: ProductsComponent,
    },

    // {
    //   path: 'initial',
    //   component: InitialComponent,
    // },
    // {
    //   path: 'users',
    //   component: UsersComponent,
    // },
    // {
    //   path: 'roles',
    //   component: RolesComponent,
    // },
    {
      path: '',
      redirectTo: 'products',
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