import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { UsersService } from '../../../utils/services/users.service';
import { IUsers } from '../../../utils/interfaces/gobal.interfaces';
import { PagesComponent } from '../../pages.component'; 
import { ToastrComponent } from '../../../@core/utils/toastr.component';

@Component({
  selector: 'ngx-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.scss']
})
export class InitialComponent {
  user: IUsers;
  mail: string;
  urlRedirect: string;
  submitted: boolean;

  tittle;
  content;
  status;

  userApp: IUsers = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private router: Router,
              private msalService: MsalService,
              private serviceU: UsersService,
              private toastrComponent: ToastrComponent,
              private ref: PagesComponent) {
    this.validate();
  }

  validate(){
    if (this.userApp) {
      this.router.navigate(['pages/votes']);
    }
  }
  
  login(){
    this.urlRedirect = 'https://assembly.coprocenva.com/assembly';
    // this.urlRedirect = 'http://localhost:4200';
    
    this.serviceU.getAllByMail(this.mail.toLowerCase().trim())
      .subscribe(resp => {
        this.user = (resp['object']);

        if (this.user) {
          localStorage.setItem('currentUser', JSON.stringify(this.user));
  
          location.href = this.urlRedirect;
        } else {
          this.tittle = '¡Atención!';
          this.content = 'La cuenta ingresada no tiene permisos para acceder al sistema de votación, por favor valide ' +
            'la cuenta con la que está ingresando.';
          this.status = this.toastrComponent.types[3];
  
          this.toastrComponent.makeToast(this.status, this.tittle, this.content);
        }
      });
  }

  isLoggedIn():boolean{
    return JSON.parse(localStorage.getItem('currentUser')) != null
  }

  getBrowser():boolean {
    const agent = window.navigator.userAgent.toLowerCase()

    switch (true) {
      case agent.indexOf('electron') > -1:
        return true;
      default:
        return false;
    }
  }
}