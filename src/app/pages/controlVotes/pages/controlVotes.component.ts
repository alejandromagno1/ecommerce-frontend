import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService, NbStepperComponent, NbAccordionModule, NbThemeService } from '@nebular/theme';
import { ToastrComponent } from '../../../@core/utils/toastr.component';
import { QuestionsService } from '../../../utils/services/questions.service';
import { UserVotesService } from '../../../utils/services/userVotes.service';
import { UsersService } from '../../../utils/services/users.service';
import { IQuestions, ICountVotes, IEnabledVotes, IUsersVotes } from '../../../utils/interfaces/gobal.interfaces';
import { Questions } from '../../../utils/models/questions';
import { interval } from 'rxjs';
// import { DialogComponent } from '../components/dialog.component';

@Component({
  selector: 'ngx-controlVotes',
  templateUrl: './controlVotes.component.html',
  styleUrls: ['./controlVotes.component.scss']
})
export class ControlVotesComponent implements AfterViewInit, OnDestroy {
  questions: IQuestions[] = [];
  questionsView: IQuestions[] = [];
  labels: string[] = [];
  values: number[] = [];
  votes: ICountVotes[] = [];
  userVotes: IUsersVotes[] = [];
  quest: IQuestions;

  optionsOnline: any;
  optionsVotes: any;
  dataOnline: any;
  dataVotes: any;
  themeSubscription: any;

  valHabil: number;
  valOnline: number;
  valVotes: number;

  ctrlQ: number = 0;
  idQuestion: number = 0;
  length: number;
  count: number = 1;
  btnValidate = false;
  tittle: string;
  content: string;
  status: string;

  source: LocalDataSource = new LocalDataSource();
  @ViewChild('stepper') stepperComponent: NbStepperComponent;

  constructor(private service: QuestionsService,
              private dialogService: NbDialogService,
              private serviceUV: UserVotesService,
              private serviceU: UsersService,
              private toastrComponent: ToastrComponent,
              private theme: NbThemeService) {

    this.loadAllQuestions();
  }

  loadAllQuestions() {
    this.service.getAllByState(true)
      .subscribe(resp => {
        this.questions = resp['object']

        const val = this.questions.length > 9 ? 9 : this.questions.length - 1;

        for (let index = 0; index <= val ; index++) {
          this.questionsView.push(this.questions[index]);
          this.questions[index].enabled ? this.idQuestion = this.questions[index].id : "";
        }
        
        this.btnValidate = this.questions[0].enabled;
        this.ctrlQ = 10;
      });
  }

  onChange(id: number){
    if (this.count < this.questions.length) {
      if (this.ctrlQ == this.count) {
        this.questionsView.length = 0;
  
        this.length = (this.questions.length - this.ctrlQ) >= 10 ? this.ctrlQ + 10 : this.questions.length;
  
        for (let index = this.ctrlQ; index <= this.length -1; index++) {
          this.questionsView.push(this.questions[index]);
        }
  
        this.ctrlQ = this.ctrlQ + 10;
        this.stepperComponent.reset();
      }
  
      this.btnValidate = id < 10 ? this.questionsView[id].enabled : this.questionsView[0].enabled;
      this.count++;
    }
  }
  
  update(data: Questions) {
    this.tittle = 'Información';
    this.content = 'Actualizando consulta';
    this.status = this.toastrComponent.types[0];

    this.toastrComponent.makeToast(this.status, this.tittle, this.content);

    this.service.getQuestEnabled(true)
      .subscribe(resp => {
        this.quest = resp['object'];

        if (this.quest && !data.enabled) {
          this.tittle = 'Advertencia';
          this.content = 'Existe una consulta previamente habilitada, por favor deshabiltarla para poder habilitar otra consulta';
          this.status = this.toastrComponent.types[3];
        } else {
          if (!this.btnValidate) {
            this.btnValidate = true;
            this.idQuestion = data.id;
            this.labels.length = 0;
            this.values.length = 0;
            data.enabled=true;
          } else {
            this.btnValidate = false;
            this.idQuestion = 0;
            this.labels.length = 0;
            this.values.length = 0;
            data.enabled = false;
          }
      
          this.service.update(data)
            .subscribe(result => {
      
              if(result.resultStatus == 'OK'){
                this.tittle = 'Información';
                this.content = 'Se ha actualizado con éxito la consulta';
                this.status = this.toastrComponent.types[1];

                this.updateChartOnline(data.id);
                !data.enabled ? this.updateChartVotes(data.id):"";
              }else{
                this.tittle = 'Advertencia';
                this.content = 'No se pudo actualizar la consulta, comunicarse con TI por favor';
                this.status = this.toastrComponent.types[2];
              }
              this.toastrComponent.makeToast(this.status, this.tittle, this.content);
            });
        }

        this.toastrComponent.makeToast(this.status, this.tittle, this.content);
      });
  }

  ngAfterViewInit() {
    this.themeSubscription = interval(3000).subscribe(x => {
      if (this.idQuestion != 0) {
        this.updateChartOnline(this.idQuestion);
        this.updateUsersVotes(this.idQuestion);
      }
    });
  }

  updateUsersVotes(idQuestion: number){
    this.serviceU.getAllVotes(idQuestion).subscribe(res => {
      this.userVotes = res['object'];
    })
  }

  updateChartOnline(idQuestion: number){
    this.serviceUV.getOnline(idQuestion).subscribe(res => {
      this.theme.getJsTheme().subscribe(config => {
        const colors: any = config.variables;
        const chartjs: any = config.variables.chartjs;
  
        this.setChartOptOnline(colors, chartjs, res['object']);
      });
    })
  }

  setChartOptOnline(colors, chartjs, data: IEnabledVotes){
    this.valHabil = data.totalUsr;
    this.valOnline = data.totalOnline;
    this.valVotes = data.totalVotes;

    this.dataOnline = {
      labels: ['Habilitados', 'En linea', 'Total votos'],
      datasets: [{
          // label: 'Dataset 1',
          backgroundColor: colors.infoLight,
          borderWidth: 1,
          data: [data.totalUsr, data.totalOnline, data.totalVotes, 0],
        }
      ],
    };

    this.optionsOnline = {
      showToolTips: true,
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        rectangle: {
          borderWidth: 2,
        },
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: true,
              color: chartjs.axisLineColor,
            },
            ticks: {
              fontColor: chartjs.textColor,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: false,
              color: chartjs.axisLineColor,
            },
            ticks: {
              fontColor: chartjs.textColor,
            },
          },
        ],
      },
      legend: {
        display: false,
        position: 'right',
        labels: {
          fontColor: chartjs.textColor,
        },
      },
    };
  }

  updateChartVotes(idQuestion: number){
    this.serviceUV.getCountVotes(idQuestion).subscribe(res => {
      this.theme.getJsTheme().subscribe(config => {

        const colors: any = config.variables;
        const chartjs: any = config.variables.chartjs;

        this.setChartOptVotes(colors, chartjs, res['object']);
      });
    })
  }

  setChartOptVotes(colors, chartjs, data: ICountVotes[]){
    this.votes = data;

    for (let index = 0; index < data.length; index++) {
      this.labels.push(data[index].answer);
      this.values.push(data[index].totalVotes);
    }
    
    this.dataVotes = {
      labels: this.labels,
      datasets: [{
          // label: 'Dataset 1',
          backgroundColor: colors.infoLight,
          borderWidth: 1,
          data: this.values,
        }
      ],
    };

    this.optionsVotes = {
      showToolTips: true,
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        rectangle: {
          borderWidth: 2,
        },
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: true,
              color: chartjs.axisLineColor,
            },
            ticks: {
              fontColor: chartjs.textColor,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: false,
              color: chartjs.axisLineColor,
            },
            ticks: {
              fontColor: chartjs.textColor,
            },
          },
        ],
      },
      legend: {
        display: false,
        position: 'right',
        labels: {
          fontColor: chartjs.textColor,
        },
      },
    };
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
