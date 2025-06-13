export interface RegisterRequestDTO {
  username: string;
  password: string;
  fullname: string;
  email: string;
  gender: string;
  birthdate: Date;
  weight: number;
  height: number;
  diet: {
    objective: string,
    type: string,
    physicalActivityStatus: string,
    allergies?: string[]
  }
}
