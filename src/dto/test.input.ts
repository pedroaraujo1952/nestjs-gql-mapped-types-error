import { InputType } from '@nestjs/graphql';
import { IsNumberString, IsString } from 'class-validator';

@InputType()
export class CreateInput {
  @IsNumberString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  omitUpdateProperty: string;
}
