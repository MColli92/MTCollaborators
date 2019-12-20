import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'addPercent'
})

export class AddPercentPipe implements PipeTransform {

    transform(value: string): string {
        if (value !== undefined) {
            return value + '%';
        } else {
            return '';
        }
    }
}
