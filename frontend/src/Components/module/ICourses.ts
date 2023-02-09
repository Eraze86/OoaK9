export interface ICourses {
  _id: string;
  course: string;
  price: number;
  img: string;
  description: string;
  dates: [{_id: string, date: string; number: number }];
}
