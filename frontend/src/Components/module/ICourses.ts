export interface ICourses {
  id: number;
  name: string;
  price: number;
  img: string;
  description: string;
  dates: [{ date: string; number: number }];
}
