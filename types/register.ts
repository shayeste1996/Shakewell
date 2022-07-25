
export interface IRegisterInfo {
  email: string;
  password: string;
  device_name?: string;
}

export interface IRegisterInfoError {
  response: {
    data: {
      errors: IRegisterInfo;
    };
  };
}