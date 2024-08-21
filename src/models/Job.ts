export default interface Job {
  work: { id: number; name: string };
  start_date: string;
  end_date: string;
  company: string;
  salary: string;
  certificate: file[];
}
