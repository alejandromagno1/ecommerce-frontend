import { Component, Input, AfterContentInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NbDialogRef, NbDateService } from '@nebular/theme';
import { IQuestions, IAnswers, IUserVotes } from '../../../utils/interfaces/gobal.interfaces';

@Component({
  selector: 'ngx-dialog-userVotes',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.scss'],
})
export class DialogComponent implements AfterContentInit {
  submitted: boolean;
  selected: number;
  dataI: IUserVotes;

  //variables de opciones del formulario
  @Input()
  title: string = '';

  @Input()
  quest: IQuestions;

  @Input()
  answers: IAnswers[] = [];

  //Funciones del userVotes.component.ts
  @Input()
  save: Function;
  
  constructor(protected ref: NbDialogRef<DialogComponent>,
              protected dateService: NbDateService<Date>,
              private refC: ChangeDetectorRef) {
      
    this.dataI = {};
  }
    
  ngAfterContentInit() {
    this.dataI.idQuestion = this.quest.id
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    this.dataI.idUser=1;
    this.save(this.dataI, this.ref);
  }
}
