import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS, MENU_ITEMS_BAS } from './pages-menu';
import { IUsers } from '../utils/interfaces/gobal.interfaces';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="appMenu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {
  
  menu = MENU_ITEMS;
  appMenu: NbMenuItem[] = [];
  userApp: IUsers = JSON.parse(localStorage.getItem('currentUser'));

  constructor () { }

  ngOnInit(): void {
    if (this.userApp.idRol == 1) {
      this.appMenu = MENU_ITEMS;
    } else {
      this.appMenu = MENU_ITEMS_BAS;
    }
  }
}