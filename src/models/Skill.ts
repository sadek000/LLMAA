export default interface Skill {
  skill_type: { id: number; name: string };
  experience_in: { id: number; name: string };
  rate: number;
  certificate: (file)[];
}
