export default interface FamilyMember {
  first_name: string;
  last_name: string;
  birth_date: string;
  nationality: { id: number; name: string };
  marital_status: { id: number; name: string };
  mobile_number: string;
  relation: { id: number; name: string };
  is_emergency: boolean;
  is_dead: boolean;
}
