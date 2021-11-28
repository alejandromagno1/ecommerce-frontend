import { Component, OnInit } from '@angular/core';
import { MENU_ADMIN, MENU_CUSTOMER } from './pages-menu';
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
  
  menu = MENU_ADMIN;
  appMenu: NbMenuItem[] = [];
  userApp: IUsers = JSON.parse(localStorage.getItem('currentUser'));

  constructor () { }

  ngOnInit(): void {
    this.appMenu = MENU_CUSTOMER;

    // if (this.userApp.idRol == 1) {
    //   this.appMenu = MENU_ADMIN;
    // } else {
    //   this.appMenu = MENU_CUSTOMER;
    // }
  }
}