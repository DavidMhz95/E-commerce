import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDuplicates',
  pure: false
})
export class FilterDuplicatesPipe implements PipeTransform {

  transform(value: any[], ...args: any[]): unknown {
    var result: any[] = []

    if (value) {
      if (args && args.length > 0 && args[0]) {
        value.forEach((item: any) => {
          const index: number = args[0].indexOf(item);
          if (index === -1) {
            result.push(item)
          }
        })
      }else{
        result = value
      }
    }
    return result;
  }

}
