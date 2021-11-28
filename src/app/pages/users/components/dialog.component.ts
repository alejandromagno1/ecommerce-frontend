import { Component, Input, AfterContentInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NbDialogRef, NbDateService, NbSelectComponent } from '@nebular/theme';
import { NebularInputsUtils } from '../../../@core/utils/nebularInputsUtils';
import { IUsers, IAgencies, IRoles } from '../../../utils/interfaces/gobal.interfaces';

@Component({
  selector: 'ngx-dialog-users',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.scss'],
})
export class DialogComponent implements AfterContentInit {
  submitted: boolean;
  selected: number;
  dataI: IUsers;

  toggleNgModel: boolean = false;
  Suffragent: boolean = false;
  data: boolean = false

  //variables de opciones del formulario
  @Input()
  title: string = '';

  @Input()
  option: string = '';

  @Input()
  isEdit: boolean;

  @Input()
  currentData: IUsers;

  //Variables con data para los selects
  @Input()
  agencies: IAgencies[] = [];   //Lista de agencias

  @Input()
  roles: IRoles[] = [];   //Lista de roles

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
      if (this.dataI.enabled) this.Suffragent = true;
      if (this.dataI.state) this.toggleNgModel = true;
      if (this.dataI.data) this.data = true;
    }else {
      NebularInputsUtils.setOptionNbSelect(this.nbstate, 1);
    }
  }

  resetPass(){
    this.dataI.pass = this.dataI.user.toUpperCase();
    if (this.isEdit) this.update(this.dataI, true, this.ref);
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    if (this.Suffragent) {
      this.dataI.enabled = true;
    } else{
      this.dataI.enabled = false;
    }

    if (this.toggleNgModel) {
      this.dataI.state = true;
    } else{
      this.dataI.state = false;
    }

    if (!this.isEdit) {
      this.resetPass();
      this.dataI.data = false;
      this.save(this.dataI, this.ref);
    } else {
      this.update(this.dataI, false, this.ref);  
    }
  }
}
