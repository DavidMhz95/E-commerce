import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'black-market-model';

@Pipe({
  name: 'products'
})
export class ProductsPipe implements PipeTransform {

  transform(value: Product[], ...args: any[]): Product[] {

    var results: Product[] = value
    if (args) {
      var section: string, subsection: string
      if (args.length > 0) {
        section = args[0]
      }

      if (args.length > 1) {
        subsection = args[1]
      }

      if (section) {
        results = results.filter((product: Product) => {
          return product.section == section
        })
      }

      if (subsection) {
        results = results.filter((product: Product) => {
          return product.subsection == subsection
        })
      }

    }

    return results;
  }

}
