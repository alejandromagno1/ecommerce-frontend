import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created by Alejandro Hernández - 2021
    </span>
    <div class="socials">
      <a href="" target="_blank" class="ion ion-social-chrome"></a>
      <a href="" target="_blank" class="ion ion-social-facebook"></a>
      <a href="" target="_blank" class="ion ion-social-twitter"></a>
      <a href="" target="_blank" class="ion ion-social-instagram"></a>
    </div>
  `,
})
export class FooterComponent {
}
