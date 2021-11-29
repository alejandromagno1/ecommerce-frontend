import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { NbCardModule, NbIconModule, NbInputModule, NbButtonModule, NbActionsModule, 
          NbSelectModule, NbTabsetModule, NbDatepickerModule, NbToggleModule, NbCheckboxModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DialogComponent } from './components/dialog.component';
import { AdminProdComponent } from './pages/adminProd.component';


@NgModule({
  declarations: [AdminProdComponent, DialogComponent],
  imports: [
    NbCardModule,
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
    NbCheckboxModule,
  ]
})
export class AdminProdModule { }