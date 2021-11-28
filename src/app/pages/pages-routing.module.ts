import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AgenciesComponent } from './agencies/pages/agencies.component';
import { RolesComponent } from './roles/pages/roles.component';
import { UsersComponent } from './users/pages/users.component';
import { QuestionsComponent } from './questions/pages/questions.component';
import { AnswersComponent } from './answers/pages/answers.component';
import { UserVotesComponent } from './votes/pages/userVotes.component';
import { ControlVotesComponent } from './controlVotes/pages/controlVotes.component';
import { InitialComponent } from './initial/pages/initial.component';
import { MaslGuard } from '../masl.guard';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'initial',
      component: InitialComponent,
      // canActivate: [MaslGuard]
    },
    {
      path: 'controlVotes',
      component: ControlVotesComponent,
      // canActivate: [MaslGuard]
    },
    {
      path: 'votes',
      component: UserVotesComponent,
      // canActivate: [MaslGuard]
    },
    {
      path: 'questions',
      component: QuestionsComponent,
      // canActivate: [MaslGuard]
    },
    {
      path: 'answers',
      component: AnswersComponent,
      // canActivate: [MaslGuard]
    },
    {
      path: 'users',
      component: UsersComponent,
      // canActivate: [MaslGuard]
    },
    {
      path: 'agencies',
      component: AgenciesComponent,
      // canActivate: [MaslGuard]
    },
    {
      path: 'roles',
      component: RolesComponent,
      // canActivate: [MaslGuard]
    },
    {
      path: '',
      redirectTo: 'initial',
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
