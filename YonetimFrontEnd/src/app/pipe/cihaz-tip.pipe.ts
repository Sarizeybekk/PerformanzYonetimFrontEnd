import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cihazTipPipe'
})
export class CihazTipPipe implements PipeTransform {

  transform(value: any[], searchString:string) {
    if (!searchString) {
      return value
    }

    return value.filter(i => {
      const id = i.id.toString().includes(searchString.toLowerCase())
      const cihazAdi = i.cihazAdi.toString().includes(searchString.toLowerCase())

      return (id + cihazAdi)
    })
  }

}
