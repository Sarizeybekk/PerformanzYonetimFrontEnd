import { Pipe, PipeTransform } from '@angular/core';
import { Emanet } from '../models/emanetModel';

@Pipe({
  name: 'emanetFilterPipe'
})
export class EmanetFilterPipe implements PipeTransform {

  transform(value: Emanet[],filterText:string): Emanet[]{
    return filterText?value.filter((p:Emanet)=>p.durum.toString().toLowerCase().indexOf(filterText)!==-1):value;
  }

}
