import { Component, Input, AfterContentInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NbDialogRef, NbDateService, NbSelectComponent } from '@nebular/theme';
import { NebularInputsUtils } from '../../../@core/utils/nebularInputsUtils';
import { ISales, IProducts } from '../../../utils/interfaces/gobal.interfaces';

import * as moment from 'moment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-dialog-questions',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.scss'],
})
export class DialogComponent implements AfterContentInit {
  dataI: IProducts;
  saleI: ISales;

  submitted: boolean;
  quantity: number = 0;
  total: number = 0;
  
  @Input()
  currentData: IProducts;

  //Funciones del xxx.component.ts
  @Input()
  save: Function;

  @Input()
  wishes: Function;
  
  constructor(protected ref: NbDialogRef<DialogComponent>,
              protected dateService: NbDateService<Date>,
              private refC: ChangeDetectorRef) {
    
    this.dataI = {};
    this.saleI = {};
  }
    
  ngAfterContentInit() {
    if (this.currentData) {
      this.dataI = this.currentData
    }
  }

  onChangeQuantity(und: number){
    this.total = this.dataI.price * und;
  }

  onWishes(){
    this.wishes(this.dataI);
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    let dateString = moment().format('YYYY-MM-DD');
    let newDate = new Date(dateString);

    this.saleI.idUser = 2;
    this.saleI.idProduct = this.dataI.id;
    this.saleI.quantity = this.quantity;
    this.saleI.dateSale = newDate;
    this.saleI.state = false;

    this.dataI.stock = this.dataI.stock - this.quantity;
    
    this.save(this.saleI, this.dataI, this.ref);
  }
}