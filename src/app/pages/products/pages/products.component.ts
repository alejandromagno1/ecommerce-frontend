import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { ToastrComponent } from '../../../@core/utils/toastr.component';
import { DialogComponent } from '../components/dialog.component';
import { ProductsService } from '../../../utils/services/products.service';
import { WishesService } from '../../../utils/services/wishes.service';
import { SalesService } from '../../../utils/services/sales.service';
import { IProducts, IUsersL } from '../../../utils/interfaces/gobal.interfaces';
import { Wishes } from '../../../utils/models/wishes';
import { Sales } from '../../../utils/models/sales';
import { Products } from '../../../utils/models/products';

@Component({
  selector: 'ngx-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products: IProducts[] = [];
  data: Wishes;

  tittle: string;
  content: string
  status: string;

  userApp: IUsersL = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private prodService: ProductsService,
              private wishesService: WishesService,
              private saleService: SalesService,
              private dialogService: NbDialogService,
              private toastrComponent: ToastrComponent) {

    this.data = {};
    this.loadAll();  
  }

  loadAll() {
    this.prodService.getAllActives()
      .subscribe(resp => {
        this.products = resp['object'];
      });
  }

  wishes(prod: IProducts){
    this.wishesService.getByUsrProd(this.userApp.id, prod.id)
      .subscribe(result => {
        if (!result['object']) {
          this.data.id = 0;
          this.data.idUser = this.userApp.id;
          this.data.idProduct = prod.id;
          this.data.state = true;
     
          this.tittle = 'Información';
          this.content = 'Guardando en la lista de deseo';
          this.status = this.toastrComponent.types[0];
     
          this.toastrComponent.makeToast(this.status, this.tittle, this.content);
     
          this.wishesService.add(this.data)
            .subscribe(resp => {
      
              if(resp.resultStatus == 'OK'){
                this.tittle = 'Información';
                this.content = 'Se ha guardado con éxito en la lista de deseos';
                this.status = this.toastrComponent.types[1];
              }else{
                this.tittle = 'Advertencia';
                this.content = 'No se pudo guardar el producto en la lista de deseos, comunicarse con las lineas de aternción al usuario por favor';
                this.status = this.toastrComponent.types[2];
              }
      
              this.toastrComponent.makeToast(this.status, this.tittle, this.content);
            });
        } else {
          this.tittle = 'Advertencia';
          this.content = 'El producto ya se encuentra en la lista de deseos';
          this.status = this.toastrComponent.types[2];

          this.toastrComponent.makeToast(this.status, this.tittle, this.content);
        }
    });
  }

  buy(prod: IProducts){
    this.dialogService.open(DialogComponent, {
      context: {
        save: this.save.bind(this),
        wishes: this.wishes.bind(this),
        currentData: prod
      },
    })
  }

  save(data: Sales, prod: Products, dialog: any) {
    this.tittle = 'Información';
    this.content = 'Procesando compra';
    this.status = this.toastrComponent.types[0];

    this.toastrComponent.makeToast(this.status, this.tittle, this.content);

    this.saleService.add(data)
      .subscribe(resp => {

        if(resp.resultStatus == 'OK'){
          this.tittle = 'Información';
          this.content = 'Se ha registrado con éxito la compra';
          this.status = this.toastrComponent.types[1];

          this.prodService.update(prod)
            .subscribe(upd => {
              dialog.close();
            });
        }else{
          this.tittle = 'Advertencia';
          this.content = 'No se pudo registrar las compra, comunicarse con las lineas de aternción al usuario por favor';
          this.status = this.toastrComponent.types[2];
        }

        this.toastrComponent.makeToast(this.status, this.tittle, this.content);
      });
  }
}