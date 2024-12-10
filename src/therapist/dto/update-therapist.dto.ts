import { IsString, IsNumber, IsArray, IsOptional, IsBoolean } from 'class-validator';

export class UpdateTherapistDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsArray()
  specialties?: string[];

  @IsOptional()
  @IsNumber()
  yearsOfExperience?: number;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}
