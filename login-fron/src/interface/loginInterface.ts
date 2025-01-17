// con reconocimiento facial

export interface LoginFacial {
  facial: File;
  password: string;
}

// login normal
export interface LoginNormal {
  email: string;
  password: string;
}
