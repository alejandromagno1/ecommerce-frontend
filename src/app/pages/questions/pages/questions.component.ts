import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { ToastrComponent } from '../../../@core/utils/toastr.component';
import { QuestionsService } from '../../../utils/services/questions.service';
import { Questions } from '../../../utils/models/questions';
import { DialogComponent } from '../components/dialog.component';

@Component({
  selector: 'ngx-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent {
  tableEnable = true;
  isEdit = false;
  labelSearch = 'Buscar';
  labelAdd = 'Agregar';
  statusBtnSearch = 'primary';
  settings;

  tittle;
  content;
  status;
  count;

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
      seq: {
        title: 'Secuencia',
        type: 'number',
      },
      question: {
        title: 'Consulta',
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
  
  source: LocalDataSource = new LocalDataSource();

  constructor(private service: QuestionsService,
              private dialogService: NbDialogService,
              private toastrComponent: ToastrComponent) {

    this.settings = Object.assign({}, this.mySettings);
    this.loadAll();
  }

  loadAll() {
    this.service.getAll()
      .subscribe(resp => {
        this.source.load(resp['object']);
      this.count = resp['object'].length;
      });
  }

  openDialogsaveUpdate(event, option: string) {
    var title = 'Agregar consulta';
    this.isEdit=false;

    if(option === 'edit'){
      title = 'Editar consulta'
      this.isEdit=true;
    }
    
    this.dialogService.open(DialogComponent, {
      context: {
        title: title,
        option: option,
        count: this.count,
        isEdit: this.isEdit,
        save: this.save.bind(this),
        update: this.update.bind(this),
        currentData: event.data
      },
    })
  }
  
  save(data: Questions, dialog: any) {
    this.tittle = 'Información';
    this.content = 'Guardando consulta';
    this.status = this.toastrComponent.types[0];

    this.toastrComponent.makeToast(this.status, this.tittle, this.content);

    this.service.add(data)
      .subscribe(resp => {

        if(resp.resultStatus == 'OK'){
          this.tittle = 'Información';
          this.content = 'Se ha guardado con éxito la consulta';
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

  update(data: Questions, dialog: any) {
    this.tittle = 'Información';
    this.content = 'Actualizando consulta';
    this.status = this.toastrComponent.types[0];

    this.toastrComponent.makeToast(this.status, this.tittle, this.content);

    this.service.update(data)
      .subscribe(resp => {

        if(resp.resultStatus == 'OK'){
          this.tittle = 'Información';
          this.content = 'Se ha actualizado con éxito la consulta';
          this.status = this.toastrComponent.types[1];

          this.loadAll();
          dialog.close();
        }else{
          this.tittle = 'Advertencia';
          this.content = 'No se pudo actualizar la consulta, comunicarse con TI por favor';
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