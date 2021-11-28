import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { AgenciesModule } from './agencies/agencies.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { userVotesModule } from './votes/userVotes.module';
import { controlVotesModule } from './controlVotes/controlVotes.module';
import { InitialModule } from './initial/initial.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    MiscellaneousModule,
    AgenciesModule,
    RolesModule,
    UsersModule,
    QuestionsModule,
    AnswersModule,
    userVotesModule,
    controlVotesModule,
    InitialModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}