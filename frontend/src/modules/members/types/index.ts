export type ISignupValidation = {
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
  firstName: string | null;
  lastName: string | null;
  role: string | null;
};

export type SignUpPayload = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  type: string;
};

export type User = {
  _id: string;
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  localId: string;
  type: string;
  updatedAt: string;
};
