import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { ToastrComponent } from '../../../@core/utils/toastr.component';
import { DialogComponent } from '../components/dialog.component';
import { SalesService } from '../../../utils/services/sales.service';
import { IProductsDTO, IUsersL } from '../../../utils/interfaces/gobal.interfaces';

@Component({
  selector: 'ngx-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent {
  products: IProductsDTO[] = [];

  tittle: string;
  content: string
  status: string;

  userApp: IUsersL = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private saleService: SalesService,
              private dialogService: NbDialogService,
              private toastrComponent: ToastrComponent) {

    this.loadAll();  
  }

  loadAll() {
    this.saleService.getAllShopping(this.userApp.id)
      .subscribe(resp => {
        this.products = resp['object'];
      });
  }
}