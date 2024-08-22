import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { CreateInput } from './test.input';
import { IsNumber } from 'class-validator';

@InputType()
export class UpdateInput extends PartialType(
  // CreateInput,
  // OmitType(CreateInput, ['omitUpdateProperty'] as const),
  PickType(CreateInput, ['description'] as const),
) {
  @IsNumber()
  id: number;
}
