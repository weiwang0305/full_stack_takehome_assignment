type ErrorSeverity = 'warning' | 'critical';

interface ValidationError {
  message: string;
  severity: ErrorSeverity;
}

interface RecordErrors {
  zipcode?: ValidationError;
  street?: ValidationError;
  email?: ValidationError;
  phone?: ValidationError;
}

type RecordStatus = 'pending' | 'active' | 'inactive';

export interface Record {
  id: number;
  name: string;
  email: string;
  street: string;
  city: string;
  zipcode: string;
  phone: string;
  status: RecordStatus;
  errors: RecordErrors;
}
