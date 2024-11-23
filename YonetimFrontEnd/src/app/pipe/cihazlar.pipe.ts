import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cihazlarPipe'
})
export class CihazlarPipe implements PipeTransform {

  transform(value: any[], searchString: string) {
    if (!searchString) {
      return value
    }


    return value.filter(i => {
      const id = i.id.toString().includes(searchString.toLowerCase())
      const cihazTipFk = i.cihazTipFk.toString().includes(searchString.toLowerCase())
      const cihazKod = i.cihazKod.toLowerCase().toString().includes(searchString.toLowerCase())
      return (id + cihazKod + cihazTipFk)
    })
  }

}

