import { IsString, IsOptional } from 'class-validator';
import { Geometry } from 'typeorm';

export class CreateParkDto {
  @IsString()
  name: string;

  geometry: Geometry;

  @IsString()
  @IsOptional()
  description?: string;
}
