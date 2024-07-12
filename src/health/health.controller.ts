import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('')
export class HealthController {
  constructor(private healthService: HealthService) {}

  @Get('/healthz')
  healthcheck() {
    return this.healthService.check();
  }

  @Get('/dummy')
  dummy() {
    return this.healthService.dummy();
  }
}
