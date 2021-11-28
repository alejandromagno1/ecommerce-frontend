import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

import { NgxAuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { WishesModule } from './wishes/wishes.module';
import { ShoppingModule } from './shopping/shopping.module';

// import { RolesModule } from './roles/roles.module';
// import { UsersModule } from './users/users.module';
// import { InitialModule } from './initial/initial.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    NgxAuthModule,
    ProductsModule,
    WishesModule,
    ShoppingModule
    
    // RolesModule,
    // UsersModule,
     // InitialModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}