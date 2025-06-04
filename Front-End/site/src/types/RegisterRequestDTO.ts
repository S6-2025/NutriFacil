export interface RegisterRequestDTO {
  username: string;
  password: string;
  fullname: string;
  email: string;
  gender: string;
  age: number;
  weight: number;
  height: number;
  diet: {
    objective: string,
    type: string,
    physicalActivityStatus: string,
    proteins: string[],
    vegetables: string[],
    fruits: string[],
  }
}
