import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { ToastrComponent } from '../../../@core/utils/toastr.component';
import { UsersService } from '../../../utils/services/users.service';
import { AgenciesService } from '../../../utils/services/agencies.service';
import { RolesService } from '../../../utils/services/roles.service';
import { Users } from '../../../utils/models/users';
import { Agencies } from '../../../utils/models/agencies';
import { Roles } from '../../../utils/models/roles';
import { DialogComponent } from '../components/dialog.component';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
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
      idAgency: {
        title: 'id Agencia',
        type: 'number',
      },
      name: {
        title: 'Nombre',
        type: 'string',
      },
      enabled: {
        title: 'Sufragante',
        type: 'String',
        valuePrepareFunction: (enabled) => {
          if (enabled) {
            return 'Si'
          } else {
            return 'No'
          }
        }
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
  
  agencies: Agencies[] = [];
  roles: Roles[] = [];
  source: LocalDataSource = new LocalDataSource();

  constructor(private service: UsersService,
              private serviceAg: AgenciesService,
              private serviceRl: RolesService,
              private dialogService: NbDialogService,
              private toastrComponent: ToastrComponent) {

    this.settings = Object.assign({}, this.mySettings);
    this.loadAll();
    this.loadAllAgencies();
    this.loadAllRoles();
  }

  loadAll() {
    this.service.getAll()
      .subscribe(resp => {
        this.source.load(resp['object']);
      });
  }

  loadAllAgencies() {
    this.serviceAg.getAllActives()
      .subscribe(resp => {
        this.agencies = resp['object'];
      });
  }

  loadAllRoles() {
    this.serviceRl.getAllActives()
      .subscribe(resp => {
        this.roles = resp['object'];
      });
  }

  openDialogsaveUpdate(event, option: string) {
    var title = 'Agregar usuario';
    this.isEdit=false;

    if(option === 'edit'){
      title = 'Editar usuario'
      this.isEdit=true;
    }
    
    this.dialogService.open(DialogComponent, {
      context: {
        title: title,
        option: option,
        isEdit: this.isEdit,
        agencies: this.agencies,
        roles: this.roles,
        save: this.save.bind(this),
        update: this.update.bind(this),
        currentData: event.data
      },
    })
  }
  
  save(data: Users, dialog: any) {
    this.tittle = 'Información';
    this.content = 'Guardando usuario';
    this.status = this.toastrComponent.types[0];

    this.toastrComponent.makeToast(this.status, this.tittle, this.content);

    this.service.add(data)
      .subscribe(resp => {

        if(resp.resultStatus == 'OK'){
          this.tittle = 'Información';
          this.content = 'Se ha guardado con éxito el usuario';
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

  update(data: Users, pass: boolean, dialog: any) {
    this.status = this.toastrComponent.types[0];
    this.tittle = 'Información';
    if (pass) {
      this.content = 'Reseteando contraseña';  
    } else {
      this.content = 'Actualizando usuario';
    }
    
    this.toastrComponent.makeToast(this.status, this.tittle, this.content);

    this.service.update(data)
      .subscribe(resp => {

        if(resp.resultStatus == 'OK'){
          this.status = this.toastrComponent.types[1];
          this.tittle = 'Información';
          if (pass) {
            this.content = 'Se ha actualizado con éxito la contraseña';
          } else {
            this.content = 'Se ha actualizado con éxito el usuario';
          }

          this.loadAll();
          dialog.close();
        }else{
          this.status = this.toastrComponent.types[2];
          this.tittle = 'Advertencia';
          if (pass) {
            this.content = 'No se pudo actualizar la contraseña, comunicarse con TI por favor';
          } else {
            this.content = 'No se pudo actualizar el usuario, comunicarse con TI por favor';
          }
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
