import { NbSelectComponent, NbOptionComponent } from '@nebular/theme';
import * as _ from 'lodash';


export class NebularInputsUtils {

    static setOptionNbSelect(selectComponent: NbSelectComponent, optToCompare: any) {
        setTimeout(() => {
            if (selectComponent) {
                const selectedOptions: NbOptionComponent[] = [];
                for (const option of selectComponent.options['_results']) {
                    if (_.isEqual(optToCompare, option['value'])) {
                        selectedOptions.push(option);
                        break;
                    }
                }
                for (const option of selectedOptions) {
                    selectComponent['selectOption'](option);
                }
                selectComponent['cd'].detectChanges();
            }
        }, 500);
        
    }
}