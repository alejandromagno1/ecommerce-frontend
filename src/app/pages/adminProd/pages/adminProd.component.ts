import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { ToastrComponent } from '../../../@core/utils/toastr.component';
import { DialogComponent } from '../components/dialog.component';
import { ProductsService } from '../../../utils/services/products.service';
import { LinesService } from '../../../utils/services/lines.service';
import { ILines } from '../../../utils/interfaces/gobal.interfaces';
import { Products } from '../../../utils/models/products';

@Component({
  selector: 'ngx-adminProd',
  templateUrl: './adminProd.component.html',
  styleUrls: ['./adminProd.component.scss']
})
export class AdminProdComponent {
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
      nameProd: {
        title: 'Nombre',
        type: 'string',
      },
      price: {
        title: 'Precio',
        type: 'string'
      },
      stock: {
        title: 'Stock',
        type: 'string'
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
  
  data: ILines[] = [];
  source: LocalDataSource = new LocalDataSource();

  constructor(private prodService: ProductsService,
              private lineService: LinesService,
              private dialogService: NbDialogService,
              private toastrComponent: ToastrComponent) {

    this.settings = Object.assign({}, this.mySettings);
    this.loadAll();
    this.loadAllRoles();
  }

  loadAll() {
    this.prodService.getAll()
      .subscribe(resp => {
        this.source.load(resp['object']);
      });
  }

  loadAllRoles() {
    this.lineService.getAllActives()
      .subscribe(resp => {
        this.data = resp['object'];
      });
  }

  openDialogsaveUpdate(event, option: string) {
    var title = 'Agregar producto';
    this.isEdit=false;

    if(option === 'edit'){
      title = 'Editar producto'
      this.isEdit=true;
    }
    
    this.dialogService.open(DialogComponent, {
      context: {
        title: title,
        option: option,
        isEdit: this.isEdit,
        lines: this.data,
        save: this.save.bind(this),
        update: this.update.bind(this),
        currentData: event.data
      },
    })
  }
  
  save(data: Products, dialog: any) {
    this.tittle = 'Información';
    this.content = 'Guardando usuario';
    this.status = this.toastrComponent.types[0];

    this.toastrComponent.makeToast(this.status, this.tittle, this.content);

    this.prodService.add(data)
      .subscribe(resp => {

        if(resp.resultStatus == 'OK'){
          this.tittle = 'Información';
          this.content = 'Se ha guardado con éxito el producto';
          this.status = this.toastrComponent.types[1];

          this.loadAll();
          dialog.close();
        }else{
          this.tittle = 'Advertencia';
          this.content = 'No se pudo guardar el producto, comunicarse con TI por favor';
          this.status = this.toastrComponent.types[2];
        }

        this.toastrComponent.makeToast(this.status, this.tittle, this.content);
      });
  }

  update(data: Products, dialog: any) {
    this.tittle = 'Información';
    this.content = 'Actualizando producto';
    this.status = this.toastrComponent.types[0];
    
    this.toastrComponent.makeToast(this.status, this.tittle, this.content);

    this.prodService.update(data)
      .subscribe(resp => {

        if(resp.resultStatus == 'OK'){
          this.tittle = 'Información';
          this.content = 'Se ha actualizado con éxito el producto';
          this.status = this.toastrComponent.types[1];

          this.loadAll();
          dialog.close();
        }else{
          this.status = this.toastrComponent.types[2];
          this.tittle = 'Advertencia';
          this.content = 'No se pudo actualizar el producto, comunicarse con TI por favor';
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