import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbAlertModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDialogModule, NbInputModule, NbSpinnerModule } from '@nebular/theme';
import { NgxLoginComponent } from './login/login.component';

@NgModule({
  declarations: [NgxLoginComponent,],
  imports: [
    FormsModule,
    NbCardModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbSpinnerModule,
    NbDialogModule
  ],
})
export class NgxAuthModule {}