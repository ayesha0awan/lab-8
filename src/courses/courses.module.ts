
import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { LoggerService } from './logger.service';
import { COURSE_CONFIG } from './course-config';

@Module({
  controllers: [CoursesController],
  providers: [
    CoursesService,
    LoggerService,
    {
      provide: COURSE_CONFIG,
      useValue: { maxCredits: 4 },
    },
  ],
})
export class CoursesModule {}
