export default interface Address {
  city: { id: number; name: string };
  area: { id: number; name: string };
  town: string;
  description: string;
  phone_number: string;
  is_always: string;
}
