/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, 
              private seoService: SeoService,
              private msalService: MsalService) { }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();

    // if (!JSON.parse(localStorage.getItem('currentUser'))) {
    //   this.msalService.instance.handleRedirectPromise().then(
    //     res => {
    //       if (res != null && res.account != null){
    //           this.msalService.instance.setActiveAccount(res.account)
    //       }
    //     })
  
    //     if (!this.isLoggedIn()) {
    //       this.login();
    //     }
    // }
  }

  isLoggedIn():boolean{
    return this.msalService.instance.getActiveAccount() != null
  }

  login(){
    this.msalService.loginRedirect();

    // this.msalService.loginPopup().subscribe((Response: AuthenticationResult) => {
    //   this.msalService.instance.setActiveAccount(Response.account)
    // });
  }

  logout(){
    this.msalService.logout();
  }
}