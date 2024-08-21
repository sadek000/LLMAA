export default interface Education {
  education_type: { id: number; name: string };
  institution: { id: number; name: string; education_type_id: number };
  specialization: {
    id: number;
    name: string;
    institution_source_id: number;
    specialization_id: number;
  };
  rate: number;
  start_date: string;
  year: string;
  end_date: string;
  graduated: boolean;
  certificate_image: file[];
  attendance_document: file[];
  secondary_certificate: file[];
}
