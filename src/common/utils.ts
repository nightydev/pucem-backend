import { BadRequestException, InternalServerErrorException, Logger } from "@nestjs/common";

// Common DB exceptions
export function handleDBExceptions(error: any, logger: Logger) {
  if (error.code === '23505') {
    throw new BadRequestException(error.detail);
  }

  logger.error(error);
  throw new InternalServerErrorException('Unexpected error, check server logs');
}

// Check if the dto has data
export function emptyDtoException(dto: any) {
  if (!dto || Object.keys(dto).length === 0) {
    throw new BadRequestException('Send data to update');
  }
}