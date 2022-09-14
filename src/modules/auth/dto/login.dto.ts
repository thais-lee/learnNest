import { IsNotEmpty, IsString } from 'class-validator';
export class LoginDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LoginResponseDto {
  token: string;
  user: {
    id: string;
    username: string;
    name: string;
  };
}
