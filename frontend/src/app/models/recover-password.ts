export interface RecoverPasswords {
    password: String;
    password_confirmation: String;
    token?: String | null;
    email?: String | null;
  }