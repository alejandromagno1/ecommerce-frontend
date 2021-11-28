import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { ToastrComponent } from '../../../@core/utils/toastr.component';
import { ProductsService } from '../../../utils/services/products.service';
import { DialogComponent } from '../components/dialog.component';
import { Products } from '../../../utils/models/products';
import { IProducts } from '../../../utils/interfaces/gobal.interfaces';

@Component({
  selector: 'ngx-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products: IProducts[] = [];

  constructor(private prodService: ProductsService,
              private dialogService: NbDialogService,
              private toastrComponent: ToastrComponent) {

    this.loadAll();  
  }

  loadAll() {
    this.prodService.getAllActives()
      .subscribe(resp => {
        this.products = resp['object'];
      });
  }
}