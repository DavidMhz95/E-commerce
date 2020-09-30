export function CopyObject(object: any): any {
    return JSON.parse(JSON.stringify(object))
}

export function RandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export function RandomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = Object.keys(anEnum)
        .map(n => Number.parseInt(n))
        .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
    const randomIndex = Math.floor(Math.random() * enumValues.length)
    const randomEnumValue = enumValues[randomIndex]
    return randomEnumValue;
}

export function PickTextColorBasedOnBgColorAdvanced(bgColor, lightColor, darkColor) {
    var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    var r = parseInt(color.substring(0, 2), 16); // hexToR
    var g = parseInt(color.substring(2, 4), 16); // hexToG
    var b = parseInt(color.substring(4, 6), 16); // hexToB
    var uicolors = [r / 255, g / 255, b / 255];
    var c = uicolors.map((col) => {
      if (col <= 0.03928) {
        return col / 12.92;
      }
      return Math.pow((col + 0.055) / 1.055, 2.4);
    });
    var L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
    return (L > 0.179) ? darkColor : lightColor;
  }

  export function LightenDarkenColor(col, amt) {
  
    var value  = col

    if(col && amt !=0){
      var usePound = false;
  
      if (col[0] == "#") {
          col = col.slice(1);
          usePound = true;
      }
   
      var num = parseInt(col,16);
   
      var r = (num >> 16) + amt;
   
      if (r > 255) r = 255;
      else if  (r < 0) r = 0;
   
      var b = ((num >> 8) & 0x00FF) + amt;
   
      if (b > 255) b = 255;
      else if  (b < 0) b = 0;
   
      var g = (num & 0x0000FF) + amt;
   
      if (g > 255) g = 255;
      else if (g < 0) g = 0;
   
      value = (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
    }
    return value
}

export function HexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

