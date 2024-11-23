import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emanetler'
})
export class EmanetlerPipe implements PipeTransform {

  transform(value: any[], searchString:string){

    if (!searchString) {
      return value
    }

    return value.filter(i=> {
      const cihazFk = i.cihazFk.toLowerCase().toString().includes(searchString.toLowerCase())
      const musteriAdSoyad = i.musteriAdSoyad.toLowerCase().toString().includes(searchString.toLowerCase())
      const musteriAdres = i.musteriAdres.toLowerCase().toString().includes(searchString.toLowerCase())
      const musteriTelefon = i.musteriTelefon.toLowerCase().toString().includes(searchString.toLowerCase())
      const teslimEdenKisi = i.teslimEdenKisi.toLowerCase().toString().includes(searchString.toLowerCase())
      const teslimAlanKisi = i.teslimAlanKisi.toLowerCase().toString().includes(searchString.toLowerCase())


      const not = i.not.toLowerCase().toString().includes(searchString.toLowerCase())
     
      return (cihazFk + musteriAdSoyad + musteriTelefon + musteriAdres + not+ teslimAlanKisi + teslimEdenKisi)
    })
  }

}
