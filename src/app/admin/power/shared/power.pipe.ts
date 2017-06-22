import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'Checked'})
export class CheckedPipe implements PipeTransform {
  transform(value: string, exponent: Array<string>): boolean {
      if(!exponent) return false;
      let isExite=exponent.filter(val=> value==val);
      return isExite.length>0;
  }
}

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }
}