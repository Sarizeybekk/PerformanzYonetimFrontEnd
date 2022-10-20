import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'atillarPipe'
})
export class AtilPipe implements PipeTransform {

  transform(value: any[], searchString:string) {
    if (!searchString) {
      return value
    }

    return value.filter(i => {
      const id = i.id.toString().includes(searchString.toLowerCase())
      const atilNedeni = i.atilNedeni.toString().includes(searchString.toLowerCase())

      const not = i.not.toLowerCase().toString().includes(searchString.toLowerCase())

      return (id + atilNedeni  + not )
    })


  }



}
