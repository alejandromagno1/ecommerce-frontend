import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { ToastrComponent } from '../../../@core/utils/toastr.component';
import { DialogComponent } from '../components/dialog.component';
import { LinesService } from '../../../utils/services/lines.service';
import { Lines } from '../../../utils/models/lines';


@Component({
  selector: 'ngx-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.scss']
})
export class LinesComponent {
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
      nameLine: {
        title: 'Rol',
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

  constructor(private lineService: LinesService,
              private dialogService: NbDialogService,
              private toastrComponent: ToastrComponent) {

    this.settings = Object.assign({}, this.mySettings);
    this.loadAll();
  }

  loadAll() {
    this.lineService.getAll()
      .subscribe(resp => {
        this.source.load(resp['object']);
      });
  }

  openDialogsaveUpdate(event, option: string) {
    var title = 'Agregar linea';
    this.isEdit=false;

    if(option === 'edit'){
      title = 'Editar linea'
      this.isEdit=true;
    }
    
    this.dialogService.open(DialogComponent, {
      context: {
        title: title,
        option: option,
        isEdit: this.isEdit,
        save: this.save.bind(this),
        update: this.update.bind(this),
        currentData: event.data
      },
    })
  }
  
  save(data: Lines, dialog: any) {
    this.tittle = 'Información';
    this.content = 'Guardando linea';
    this.status = this.toastrComponent.types[0];

    this.toastrComponent.makeToast(this.status, this.tittle, this.content);

    this.lineService.add(data)
      .subscribe(resp => {

        if(resp.resultStatus == 'OK'){
          this.tittle = 'Información';
          this.content = 'Se ha guardado con éxito la linea';
          this.status = this.toastrComponent.types[1];

          this.loadAll();
          dialog.close();
        }else{
          this.tittle = 'Advertencia';
          this.content = 'No se pudo guardar la linea, comunicarse con TI por favor';
          this.status = this.toastrComponent.types[2];
        }

        this.toastrComponent.makeToast(this.status, this.tittle, this.content);
      });
  }

  update(data: Lines, dialog: any) {
    this.tittle = 'Información';
    this.content = 'Actualizando linea';
    this.status = this.toastrComponent.types[0];

    this.toastrComponent.makeToast(this.status, this.tittle, this.content);

    this.lineService.update(data)
      .subscribe(resp => {

        if(resp.resultStatus == 'OK'){
          this.tittle = 'Información';
          this.content = 'Se ha actualizado con éxito la linea';
          this.status = this.toastrComponent.types[1];

          this.loadAll();
          dialog.close();
        }else{
          this.tittle = 'Advertencia';
          this.content = 'No se pudo actualizar la linea, comunicarse con TI por favor';
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