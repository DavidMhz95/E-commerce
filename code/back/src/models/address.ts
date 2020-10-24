export class Address {

    constructor(
        public name?:string,
        public surname?:string,
        public street? : string,
        public streetAlt?: string,
        public zip?: number,
        public city?: string,
        public country?: string,
        public telephone?:string
    ) {}

  }