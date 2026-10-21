
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private readonly logger = new Logger('CoursesService');

  log(message: string): void {
    this.logger.log(message);
  }
}
