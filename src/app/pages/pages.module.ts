import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';

import { ProductsModule } from './products/products.module';

// import { DashboardModule } from './dashboard/dashboard.module';
// import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
// import { AgenciesModule } from './agencies/agencies.module';
// import { RolesModule } from './roles/roles.module';
// import { UsersModule } from './users/users.module';
// import { QuestionsModule } from './questions/questions.module';
// import { userVotesModule } from './votes/userVotes.module';
// import { controlVotesModule } from './controlVotes/controlVotes.module';
// import { InitialModule } from './initial/initial.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    ProductsModule
    
    // DashboardModule,
    // MiscellaneousModule,
    // AgenciesModule,
    // RolesModule,
    // UsersModule,
    // QuestionsModule,
    // userVotesModule,
    // controlVotesModule,
    // InitialModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}