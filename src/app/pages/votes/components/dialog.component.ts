import { Component, Input, AfterContentInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NbDialogRef, NbDateService } from '@nebular/theme';
import { IQuestions, IAnswers, IUserVotes, IUsers } from '../../../utils/interfaces/gobal.interfaces';

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

  userApp: IUsers = JSON.parse(localStorage.getItem('currentUser'));
  
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
    this.dataI.idUser = this.userApp.id;
    this.save(this.dataI, this.ref);
  }
}