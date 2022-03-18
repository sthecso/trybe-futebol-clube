interface LoginDTO {
  username: string;
  role: string;
  email: string;
  password: string;
}

export default class LoginRegisted implements LoginDTO {
  username: string;

  role: string;

  email: string;

  password: string;
}
