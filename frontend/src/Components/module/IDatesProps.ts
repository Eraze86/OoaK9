export interface IDatesProps {
  _id: string;
  course: string;
  dates: [
    {
      _id: string,
      date: string;
      number: number;
    }
  ];
}
