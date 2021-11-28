import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { ToastrComponent } from '../../../@core/utils/toastr.component';
import { QuestionsService } from '../../../utils/services/questions.service';
import { AnswersService } from '../../../utils/services/answers.service';
import { Questions } from '../../../utils/models/questions';
import { Answers } from '../../../utils/models/ansewrs';
import { DialogComponent } from '../components/dialog.component';

@Component({
  selector: 'ngx-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent {
  tableEnable = true;
  isEdit = false;
  labelSearch = 'Buscar';
  labelAdd = 'Agregar';
  statusBtnSearch = 'primary';
  settings;

  tittle;
  content;
  status;

  //Configuración de la grilla
  mySettings = {
    pager: {
      display: true,
      perPage: 10
    },
    hideSubHeader: true,
    actions: {
      columnTitle: 'Acciones',
      position: 'right',
      delete: false,
      add: false,
    },
    mode: 'external',
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    columns: {
      id: {
        title: 'Id',
        type: 'number',
      },
      idQuestion: {
        title: 'Id consulta',
        type: 'number',
      },
      seq: {
        title: 'Secuencia',
        type: 'number',
      },
      answer: {
        title: 'Respuesta',
        type: 'string',
      },
      state: {
        title: 'Estado',
        type: 'String',
        valuePrepareFunction: (state) => {
          if (state) {
            return 'Activo'
          } else {
            return 'Inactivo'
          }
        }
      },
    },
  };
  
  questions: Questions[] = [];
  source: LocalDataSource = new LocalDataSource();

  constructor(private serviceQ: QuestionsService,
              private serviceA: AnswersService,
              private dialogService: NbDialogService,
              private toastrComponent: ToastrComponent) {

    this.settings = Object.assign({}, this.mySettings);
    this.loadAll();
    this.loadAllQuestions();    
  }

  loadAll() {
    this.serviceA.getAll()
      .subscribe(resp => {
        this.source.load(resp['object']);
      });
  }

  loadAllQuestions() {
    this.serviceQ.getAllByState(true)
      .subscribe(resp => {
        this.questions = resp['object'];
      });
  }

  openDialogsaveUpdate(event, option: string) {
    var title = 'Agregar respuesta';
    this.isEdit=false;

    if(option === 'edit'){
      title = 'Editar respuesta'
      this.isEdit=true;
    }
    
    this.dialogService.open(DialogComponent, {
      context: {
        title: title,
        option: option,
        isEdit: this.isEdit,
        questions: this.questions,
        save: this.save.bind(this),
        update: this.update.bind(this),
        currentData: event.data
      },
    })
  }
  
  save(data: Answers, dialog: any) {
    this.tittle = 'Información';
    this.content = 'Guardando respuesta';
    this.status = this.toastrComponent.types[0];

    this.toastrComponent.makeToast(this.status, this.tittle, this.content);

    this.serviceA.add(data)
      .subscribe(resp => {

        if(resp.resultStatus == 'OK'){
          this.tittle = 'Información';
          this.content = 'Se ha guardado con éxito la respuesta';
          this.status = this.toastrComponent.types[1];

          this.loadAll();
          dialog.close();
        }else{
          this.tittle = 'Advertencia';
          this.status = this.toastrComponent.types[2];
        }

        this.toastrComponent.makeToast(this.status, this.tittle, this.content);
      });
  }

  update(data: Answers, dialog: any) {
    this.tittle = 'Información';
    this.content = 'Actualizando respuesta';
    this.status = this.toastrComponent.types[0];

    this.toastrComponent.makeToast(this.status, this.tittle, this.content);

    this.serviceA.update(data)
      .subscribe(resp => {

        if(resp.resultStatus == 'OK'){
          this.tittle = 'Información';
          this.content = 'Se ha actualizado con éxito la respuesta';
          this.status = this.toastrComponent.types[1];

          this.loadAll();
          dialog.close();
        }else{
          this.tittle = 'Advertencia';
          this.content = 'No se pudo actualizar la respuesta, comunicarse con TI por favor';
          this.status = this.toastrComponent.types[2];
        }

        this.toastrComponent.makeToast(this.status, this.tittle, this.content);
      });
  }
  
  activeFilter() {
    this.mySettings['hideSubHeader'] = !this.mySettings['hideSubHeader'];
    this.labelSearch = this.mySettings['hideSubHeader'] ? 'Buscar' : 'Cancelar Busqueda';
    this.statusBtnSearch = this.mySettings['hideSubHeader'] ? 'primary' : 'danger';
    this.tableEnable = false;
    setTimeout(() => {
      this.settings = Object.assign({}, this.mySettings)
      this.tableEnable = true;
    });
  }
}
