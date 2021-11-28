import { Component } from '@angular/core';

import { UsersService } from '../../../utils/services/users.service';
import { IUsersL } from '../../../utils/interfaces/gobal.interfaces';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class NgxLoginComponent {
  userI: IUsersL;

  submitted: boolean;
  urlRedirectA: string = 'http://localhost:4200/pages/adminProd';
  urlRedirectC: string = 'http://localhost:4200/pages/products';

  constructor(private userService: UsersService) {
    this.userI = {};
  }

  login() {
    this.userService.getLogin(this.userI.user, this.userI.pwd).subscribe(resp => {
      if (resp['object']) {
        this.userI = resp['object'];
        localStorage.setItem('currentUser', JSON.stringify(this.userI));

        if (this.userI.admin) {
          location.href = this.urlRedirectA;
        } else {
          location.href = this.urlRedirectC;
        }
      }
    });
  }
}