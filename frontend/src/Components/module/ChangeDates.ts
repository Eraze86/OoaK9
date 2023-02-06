export class ChangeDates{
    constructor(
        public _id: string,
        public name: string,
        public dates:[{
            _id: string;
            date: string,
            number: number,
        }],

     
    ){}
  }