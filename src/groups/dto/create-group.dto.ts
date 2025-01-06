import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({
    description: `Group`,
    example: 'Group 1',
  })
  @IsString()
  @MinLength(1)
  groupName: string;
}
