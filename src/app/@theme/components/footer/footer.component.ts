import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created by Tecnología - Coprocenva - 2021
    </span>
    <div class="socials">
      <a href="https://www.coprocenva.coop/" target="_blank" class="ion ion-social-chrome"></a>
      <a href="https://www.facebook.com/Cooperativa.Coprocenva" target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://twitter.com/Coop_Coprocenva" target="_blank" class="ion ion-social-twitter"></a>
      <a href="https://www.instagram.com/cooperativa.coprocenva/" target="_blank" class="ion ion-social-instagram"></a>
    </div>
  `,
})
export class FooterComponent {
}
