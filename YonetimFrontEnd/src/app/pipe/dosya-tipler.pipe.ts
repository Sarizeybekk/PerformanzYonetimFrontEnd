import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dosyaTiplerPipe'
})
export class DosyaTiplerPipe implements PipeTransform {

  transform(value: any[], searchString: string) {
    if (!searchString) {
      return value
    }


    return value.filter(i => {
      const id = i.id.toString().includes(searchString.toLowerCase())
      const isim = i.isim.toString().includes(searchString.toLowerCase())

      return (id + isim)
    })
  }


}
