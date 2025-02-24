export interface Record {
  id: number;
  name: string;
  email: string;
  street: string;
  city: string;
  zipcode: string;
  phone: string;
  status: string;
  errors: {
    [key: string]: {
      message: string;
      severity: string;
    };
  };
}
