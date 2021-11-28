import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ToastrComponent } from '../../../@core/utils/toastr.component';
import { UserVotesService } from '../../../utils/services/userVotes.service'
import { QuestionsService } from '../../../utils/services/questions.service'
import { AnswersService } from '../../../utils/services/answers.service'
import { UsersService } from '../../../utils/services/users.service';
import { OnLineService } from '../../../utils/services/onLine.service';
import { Questions } from '../../../utils/models/questions'
import { Answers } from '../../../utils/models/ansewrs'
import { UserVotes } from '../../../utils/models/userVotes'
import { IUsers, IOnLine } from '../../../utils/interfaces/gobal.interfaces';
import { DialogComponent } from '../components/dialog.component';

@Component({
  selector: 'ngx-userVotes',
  templateUrl: './userVotes.component.html',
  styleUrls: ['./userVotes.component.scss']
})
export class UserVotesComponent implements OnInit, OnDestroy {
  labelAdd = 'Ingresar a votar';
  statusBtnSearch = 'primary';
  isValidate = false;
  loading = false;
  enabled = false;

  tittle;
  content;
  status;

  voted: UserVotes;
  quest: Questions;
  user: IUsers;
  online: IOnLine = {};
  answers: Answers[] = [];
  
  userApp: IUsers = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private serviceQ: QuestionsService,
              private serviceA: AnswersService,
              private serviceV: UserVotesService,
              private dialogService: NbDialogService,
              private serviceU: UsersService,
              private serviceO: OnLineService,
              private toastrComponent: ToastrComponent) { }

  ngOnInit(): void {
    this.serviceU.getAllByMail(this.userApp.mail)
      .subscribe(resp => {
        this.user = (resp['object']);

        if (this.user) {
          localStorage.setItem('currentUser', JSON.stringify(this.user));
          this.enabled = this.user.enabled;
        }

        this.serviceO.getByIdUsr(this.userApp.id).subscribe(result => {
          if ((result['object'])) {
            this.online = (result['object']);
          } else {
            this.online.idUser = this.userApp.id;
            this.serviceO.update(this.online).subscribe(res => {
              this.online = (res['object']);
            });
          }
        })
      });    
  }

  ngOnDestroy(): void {
    if (this.online != null) {
      this.serviceO.delete(this.online.id).subscribe(resp => {});
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    if (this.online != null) {
      this.serviceO.delete(this.online.id).subscribe(resp => {});
    }
  }

  openDialogsaveUpdate(event) {
    var title = 'Consulta en votación';
    this.loading = true;

    this.serviceQ.getQuestEnabled(true)
      .subscribe(resp => {
        this.quest = resp['object'];

        if (this.quest) {
          this.serviceV.getByUsrQuest(this.userApp.id,this.quest.id)
            .subscribe(resp => {
              this.voted = resp['object'];

              if (this.voted == null) {
                this.serviceA.getAllByQuest(this.quest.id)
                  .subscribe(resp => {
                    this.answers = resp['object'];
                    this.loading = false;

                    this.dialogService.open(DialogComponent, {
                      context: {
                        title: title,
                        quest: this.quest,
                        answers: this.answers,
                        save: this.save.bind(this)
                      },
                    })
                  });
              } else {
                this.loading = false;
                this.isValidate = true;
                this.tittle = 'Advertencia';
                this.content = 'Su voto ya fue registrado para esta pregunta';
                this.status = this.toastrComponent.types[2];
              }
            });
        } else {
          this.loading = false;
          this.isValidate = true;
          this.tittle = 'Advertencia';
          this.content = 'No hay preguntas habilitadas para votar';
          this.status = this.toastrComponent.types[2];
        }
        if (this.isValidate) {
          this.toastrComponent.makeToast(this.status, this.tittle, this.content);  
        }
      });
  }
  
  save(data: UserVotes, dialog: any) {
    this.tittle = 'Información';
    this.content = 'Registrando el voto';
    this.status = this.toastrComponent.types[0];

    this.toastrComponent.makeToast(this.status, this.tittle, this.content);

    this.serviceV.add(data)
      .subscribe(resp => {

        if(resp.resultStatus == 'OK'){
          this.tittle = 'Información';
          this.content = 'Se ha registrado con éxito el voto';
          this.status = this.toastrComponent.types[1];

          this.quest= {};
          this.answers.length=0;
          this.isValidate = false;

          dialog.close();
        }else{
          this.tittle = 'Advertencia';
          this.status = this.toastrComponent.types[2];
        }

        this.toastrComponent.makeToast(this.status, this.tittle, this.content);
      });
  }
}