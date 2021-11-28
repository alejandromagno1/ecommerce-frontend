import { Component, Input, AfterContentInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NbDialogRef, NbDateService, NbSelectComponent } from '@nebular/theme';
import { NebularInputsUtils } from '../../../@core/utils/nebularInputsUtils';
import { AgenciesService } from '../../../utils/services/agencies.service';
import { IAgencies } from '../../../utils/interfaces/gobal.interfaces';

import * as moment from 'moment';

@Component({
  selector: 'ngx-dialog-agencies',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.scss'],
})
export class DialogComponent implements AfterContentInit {
  submitted: boolean;
  selected: number;
  dataI: IAgencies;

  toggleNgModel: boolean = false;

  //variables de opciones del formulario
  @Input()
  title: string = '';

  @Input()
  option: string = '';

  @Input()
  isEdit: boolean;

  @Input()
  currentData: IAgencies; 

  //Definición de los select para nebular y definir un valor por defecto en el constructor
  @ViewChild('nbstate', { static: true })
  public nbstate: NbSelectComponent = null;   //Select de estado del role

  //Funciones del users.component.ts
  @Input()
  save: Function;

  @Input()
  update: Function;
  
  constructor(protected ref: NbDialogRef<DialogComponent>,
              protected dateService: NbDateService<Date>,
              private refC: ChangeDetectorRef) {
    
    this.dataI = {};
  }
    
  ngAfterContentInit() {
    if (this.currentData) {
      this.dataI = this.currentData;
      if (this.dataI.state) this.toggleNgModel = true;
    }else {
      NebularInputsUtils.setOptionNbSelect(this.nbstate, 1);
    }
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    if (this.toggleNgModel) {
      this.dataI.state = true;
    } else{
      this.dataI.state = false;
    }

    if (!this.isEdit) {
      this.save(this.dataI, this.ref);
    } else {
      this.update(this.dataI, this.ref);  
    }
  }
}
