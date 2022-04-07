export interface Employee {
  id: number | null;
  name: string;
  gender?: string;
  phoneNumber?: string;
  contactPref: string;
  email?: string;
  dateOfBirth: Date;
  department: string | null;
  isActive: boolean;
  photoPath?: string;
  password?: string;
  confirmPassword?: string;
}
