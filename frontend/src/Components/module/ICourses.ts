export interface ICourses {
  _id: string;
  name: string;
  price: number;
  img: string;
  description: string;
  dates: [{date: string; number: number }];
}
