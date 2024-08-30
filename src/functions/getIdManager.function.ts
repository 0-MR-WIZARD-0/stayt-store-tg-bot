import { ConfigService } from '@nestjs/config';

export function getManagerId(): string {
  const configService = new ConfigService();
  return configService.get<string>('ADMIN_ID');
}
