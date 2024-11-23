import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dosyalar'
})
export class DosyalarPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
