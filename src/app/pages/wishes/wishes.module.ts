import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { NbCardModule, NbListModule, NbIconModule, NbInputModule, NbButtonModule, NbActionsModule, 
          NbSelectModule, NbTabsetModule, NbDatepickerModule, NbToggleModule, NbRadioModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { WishesComponent } from './pages/wishes.component';
import { DialogComponent } from './components/dialog.component';


@NgModule({
  declarations: [WishesComponent, DialogComponent],
  imports: [
    NbCardModule,
    NbListModule,
    NbIconModule,
    NbInputModule,
    NbSelectModule,
    ThemeModule,
    NbButtonModule,
    NbActionsModule,
    Ng2SmartTableModule,
    FormsModule,
    NbTabsetModule,
    ReactiveFormsModule,
    NbDatepickerModule,
    NbToggleModule,
    NbRadioModule,
  ]
})
export class WishesModule { }