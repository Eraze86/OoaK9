export class ChangeDates{
    constructor(
        public _id: string,
        public course: string,
        public dates:[{
            _id: string;
            date: string,
            number: number,
        }],

     
    ){}
  }