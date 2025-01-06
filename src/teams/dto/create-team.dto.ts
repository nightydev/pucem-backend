import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({
    description: `Team name`,
    example: 'Team A',
  })
  @IsString()
  teamName: string;

  @ApiProperty({
    description: `Group ID`,
    example: 'uuid-of-group',
  })
  @IsUUID()
  groupId: string;

  @ApiProperty({
    description: `Patient ID`,
    example: 'uuid-of-patient',
  })
  @IsUUID()
  patientId: string;
}
