import IdCard from "./IdCard";
import PassportInformation from "./PassportInformation";
import Address from "./Address";
import Education from "./Education";
import EmergencyContact from "./EmergencyContact";
import FamilyMember from "./FamilyMember";
import Job from "./Job";
import Skill from "./Skill";

export default interface Employee {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  serial_employee_number: string;
  start_date: string;
  contract: { number: string; from_date: string; to_date: string };
  health_insurance_number: string;
  mobile_numbers: { num: string }[];
  gender: { id: number; name: string };
  nationality: { id: number; name: string };
  religion: { id: number; name: string };
  military_status: { id: number; name: string };
  blood_type: { id: number; name: string };
  marital_status: { id: number; name: string };
  child_count: number;
  work_place: { id: number; name: string; type: string };
  station: { id: number; name: string };
  position: { id: number; name: string };
  work_shift: { id: number; name: string };
  labor_law: { id: number; name: string };
  image: file;

  id_card: IdCard;
  passport_information: PassportInformation;

  addresses: Address[];

  family_members: FamilyMember[];

  emergency: EmergencyContact[];

  education_paths: Education[];

  jobs: Job[];

  skills: Skill[];
}
