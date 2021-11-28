import { Injectable } from '@angular/core';
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbToastrConfig,
} from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})

export class ToastrComponent {
  constructor(private toastrService: NbToastrService) { }

  config: NbToastrConfig;

  destroyByClick = true;
  duration = 4000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = true;

  types: NbComponentStatus[] = [
    'info',
    'success',
    'warning',
    'danger',
    'control',
    'basic',
    'primary',
  ];
  
  makeToast(status, title, content) {
    this.showToast(status, title, content);
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };

    this.toastrService.show(body, title, config);
  }
}
