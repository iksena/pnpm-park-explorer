import { IsString, IsOptional } from 'class-validator';

export class CreateParkDto {
  @IsString()
  name: string;

  @IsString()
  geom: string;

  @IsString()
  @IsOptional()
  description?: string;
}
