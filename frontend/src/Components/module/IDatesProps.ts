export interface IDatesProps {
  _id: string;
  name: string;
  dates: [
    {
      _id: string,
      date: string;
      number: number;
    }
  ];
}
