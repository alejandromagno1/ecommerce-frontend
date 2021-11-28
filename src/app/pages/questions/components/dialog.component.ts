import { Component, Input, AfterContentInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NbDialogRef, NbDateService, NbSelectComponent } from '@nebular/theme';
import { NebularInputsUtils } from '../../../@core/utils/nebularInputsUtils';
import { IQuestions } from '../../../utils/interfaces/gobal.interfaces';

@Component({
  selector: 'ngx-dialog-questions',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.scss'],
})
export class DialogComponent implements AfterContentInit {
  submitted: boolean;
  selected: number;
  dataI: IQuestions;
  
  sequences: number[] = [];

  toggleNgModel: boolean = false;

  //variables de opciones del formulario
  @Input()
  title: string = '';

  @Input()
  option: string = '';

  @Input()
  isEdit: boolean;
  
  @Input()
  count: number;

  @Input()
  currentData: IQuestions; 

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
      this.onChangeOrder(1);
      if (this.dataI.state) this.toggleNgModel = true;
    }else {
      this.dataI.idType=1;
      this.onChangeOrder(0);
      NebularInputsUtils.setOptionNbSelect(this.nbstate, 1);
    }
  }

  onChangeOrder(flag: number){
    this.sequences = [];

    for (let i = 0; i < this.count; i++) {
      this.sequences.push(i+1);
    }
    
    (flag == 1) ? this.dataI = this.currentData : this.sequences.push(this.sequences.length + 1);
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
      this.dataI.enabled=false
      this.save(this.dataI, this.ref);
    } else {
      this.update(this.dataI, this.ref);  
    }
  }
}
