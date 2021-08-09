import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsString } from 'class-validator';

@InputType()
export class CreateStudentInput {
  @IsString()
  @Field()
  firstName: string;

  @IsString()
  @Field()
  lastName: string;

  @IsDateString()
  @Field()
  birthDate: string;
}
