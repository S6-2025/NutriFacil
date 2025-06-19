export interface RegisterRequestDTO {
  username: string;
  password: string;
  fullname: string;
  email: string;
  gender: string;
  birthdate: Date;
  weight: number;
  height: number;
  allergies?: string[];
  diet: {
    objective: string,
    type: string,
    physicalActivityStatus: string,
    
  }
}
