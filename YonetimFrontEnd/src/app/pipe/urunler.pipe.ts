import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urunlerPipe'
})
export class UrunlerPipe implements PipeTransform {

  transform (value: any[], searchString:string){
    if (!searchString) {
      return value
    }

    return value.filter(i => {
      const id = i.id.toString().includes(searchString.toLowerCase())
      const urunAdi = i.urunAdi.toString().includes(searchString.toLowerCase())
      const birim = i.birim.toLowerCase().toString().includes(searchString.toLowerCase())
      const not = i.not.toLowerCase().toString().includes(searchString.toLowerCase())

      return (id + urunAdi + birim + not )
    })


  }

}
