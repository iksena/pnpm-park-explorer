import { IsString, IsOptional, IsObject, IsDate } from 'class-validator';
import { Geometry } from 'typeorm';

export class UpdateParkDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsObject()
  @IsOptional()
  geometry: Geometry;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
