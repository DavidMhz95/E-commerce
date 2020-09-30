import { Injectable } from '@angular/core';
import { PickTextColorBasedOnBgColorAdvanced, HexToRgb } from '../app.utils';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }

  getColor(color: string) {
    if(color){
      return PickTextColorBasedOnBgColorAdvanced(color, '#FFFFFF', '#000000');
    }
  }

  setBackgroundColor(event: any, color: string) {
    var resultColor = this.setLightenDarkenColor(color ? color : '#000000', 0.1)
    if (event && event.type == 'mouseleave' && event.srcElement instanceof HTMLElement) {
      (event.srcElement as HTMLElement).style.backgroundColor = resultColor
    } else if (event && event.type == 'mouseenter' && event.toElement instanceof HTMLElement) {
      (event.toElement as HTMLElement).style.backgroundColor = resultColor
    }
  }

  setLightenDarkenColor(color: string, opacity: number) {
    var result: string
    if (color) {
      var rgb = HexToRgb(color)
      result = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + opacity + ')'
    }
    return result
  }
}
