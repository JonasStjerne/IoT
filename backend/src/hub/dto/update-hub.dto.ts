import { IsNotEmpty } from 'class-validator';

export class RenameHubDto {
  @IsNotEmpty()
  name: string;
}
