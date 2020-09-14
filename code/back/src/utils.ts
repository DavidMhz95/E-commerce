declare global {
    interface Array<T> {
        getRandomElements(randomNumber: number): Array<T>;
        selectMany(fn: any): any;
    }
}

(function () {
    var apply = Function.prototype.apply;
    var flatten = apply.bind(Array.prototype.concat, []);

    Array.prototype.selectMany = function (fn) {
        var values = flatten(this.map(fn))
        return values.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        })
    };
}());

Array.prototype.getRandomElements = function (randomNumber) {
    var result = shuffle(this)
    if (randomNumber > 0) {
        result = result.slice(0, randomNumber)
    }
    return result;
}

function shuffle(array: any[]): any[] {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

export interface KeyValuePair {
    key: string,
    value: any[]
}

export interface IDictionary {
    add(key: string, value: any): void;
    remove(key: string): void;
    containsKey(key: string): boolean;
    keys(): string[];
    values(): any[];
    toKeyValuePairList(): KeyValuePair[];
}

export class Dictionary implements IDictionary {

    _keys: string[] = [];
    _values: any[] = [];

    constructor(init: { key: string; value: any; }[]) {
        if (init) {
            for (var x = 0; x < init.length; x++) {
                this[init[x].key] = init[x].value;
                this._keys.push(init[x].key);
                this._values.push(init[x].value);
            }
        }
    }

    add(key: string, value: any) {
        this[key] = value;
        this._keys.push(key);
        this._values.push(value);
    }

    remove(key: string) {
        var index = this._keys.indexOf(key, 0);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);

        delete this[key];
    }

    keys(): string[] {
        return this._keys;
    }

    values(): any[] {
        return this._values;
    }

    containsKey(key: string) {
        if (typeof this[key] === "undefined") {
            return false;
        }

        return true;
    }

    toLookup(): IDictionary {
        return this;
    }

    toKeyValuePairList(): KeyValuePair[] {
        var keyValuePairList: KeyValuePair[] = []
        this._keys.forEach(key => {
            keyValuePairList.push({ key, value: this[key] })
        });
        return keyValuePairList
    }
}

export function parts(source: string, invertResults: boolean = false): string[] {
    var parts: string[] = source.split(" ")
    var matrix: string[][] = []
    var result: string[] = []


    for (var i = 0; i < parts.length; i++) {
        matrix[i] = [];
        for (var j = 0; j <= i; j++) {
            matrix[i][j] = parts[j];
        }
        result[i] = matrix[i].join(' ').trim()
    }
    if (invertResults) {
        result.reverse()
    }
    return result;
}

export function containsIgnoreAccent(source: string, value: string, isContains: boolean): boolean {
    var sourceNormalized: string = source.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().trim()
    var valueNormalized: string = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().trim()
    var result
    if (isContains) {
        result = sourceNormalized.includes(valueNormalized)
    } else {
        result = sourceNormalized == valueNormalized
    }
    return result
}

export function levenshtein(a: string, b: string): number {
    const an = a ? a.length : 0;
    const bn = b ? b.length : 0;
    if (an === 0) {
        return bn;
    }
    if (bn === 0) {
        return an;
    }
    const matrix = new Array<number[]>(bn + 1);
    for (let i = 0; i <= bn; ++i) {
        let row = matrix[i] = new Array<number>(an + 1);
        row[0] = i;
    }
    const firstRow = matrix[0];
    for (let j = 1; j <= an; ++j) {
        firstRow[j] = j;
    }
    for (let i = 1; i <= bn; ++i) {
        for (let j = 1; j <= an; ++j) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            }
            else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1], // substitution
                    matrix[i][j - 1], // insertion
                    matrix[i - 1][j] // deletion
                ) + 1;
            }
        }
    }
    return matrix[bn][an];
};

// Cache the codes and score arrays to significantly speed up damlev calls:
// there's no need to re-allocate them.
let sourceCodes: number[];
let targetCodes: number[];
let score: number[];

/**
 * Clears the cached arrays, freeing memory that would otherwise be kept
 * forever.
 */
export function uncache() {
  sourceCodes = new Array(32);
  targetCodes = new Array(32);
  score = new Array(33 * 33);
}

uncache();

/**
 * growArray will return an array that's at least as large as the provided
 * size. It may or may not return the same array that was passed in.
 * @param  {Array} arr
 * @param  {Number} size
 * @return {Array}
 */
function growArray(arr: number[], size: number) {
  if (size <= arr.length) {
    return arr;
  }

  var target = arr.length;
  while (target < size) {
    target *= 2;
  }

  return new Array(target);
}

/**
 * Returns the edit distance between the source and target strings.
 * @param  {String} source
 * @param  {Strign} target
 * @return {Number}
 */
export default function damlev (source: string, target: string) {
  // If one of the strings is blank, returns the length of the other (the
  // cost of the n insertions)
  if (!source) {
    return target.length;
  } else if (!target){
    return source.length;
  }

  const sourceLength = source.length;
  const targetLength = target.length;
  let i: number;

  // Initialize a char code cache array
  sourceCodes = growArray(sourceCodes, sourceLength);
  targetCodes = growArray(targetCodes, targetLength);
  for (i = 0; i < sourceLength; i++) { sourceCodes[i] = source.charCodeAt(i); }
  for (i = 0; i < targetLength; i++) { targetCodes[i] = target.charCodeAt(i); }

  // Initialize the scoring matrix
  const INF = sourceLength + targetLength;
  const rowSize = sourceLength + 1;
  score = growArray(score, (sourceLength + 1) * (targetLength + 1));
  score[0] = INF;

  for (i = 0; i <= sourceLength; i++) {
    score[(i + 1) * rowSize] = INF;
    score[(i + 1) * rowSize + 1] = i;
  }

  for (i = 0; i <= targetLength; i++) {
    score[i] = INF;
    score[1 * rowSize + i + 1] = i;
  }

  // Run the damlev algorithm
  let chars: { [key: string]: number } = {};
  let j: number, DB: number, i1: number, j1: number, j2: number, newScore: number;
  for (i = 1; i <= sourceLength; i += 1) {
    DB = 0;
    for (j = 1; j <= targetLength; j += 1) {
      i1 = chars[targetCodes[j - 1]] || 0;
      j1 = DB;

      if (sourceCodes[i - 1] == targetCodes[j - 1]) {
        newScore = score[i * rowSize + j];
        DB = j;
      } else {
        newScore = Math.min(score[i * rowSize + j], Math.min(score[(i + 1) * rowSize + j], score[i * rowSize + j + 1])) + 1;
      }

      score[(i + 1) * rowSize + j + 1] = Math.min(newScore, score[i1 * rowSize + j1] + (i - i1) + (j - j1 - 1));
    }
    chars[sourceCodes[i - 1]] = i;
  }
  return score[(sourceLength + 1) * rowSize + targetLength + 1];
}


export function sortKeys(x:any) {
    if (typeof x !== 'object' || !x)
        return x;
    if (Array.isArray(x))
        return x.map(sortKeys);
    return Object.keys(x).sort().reduce((o, k) => ({...o, [k]: sortKeys(x[k])}), {});
}