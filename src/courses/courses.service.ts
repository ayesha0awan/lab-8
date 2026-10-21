
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';

import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { COURSE_CONFIG } from './course-config';
import type { CourseConfig } from './course-config';
import { LoggerService } from './logger.service';

export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  description?: string;
}

@Injectable()
export class CoursesService {
  private courses: Course[] = [];
  private nextId = 1;

 constructor(
  @Inject(COURSE_CONFIG) private readonly config: CourseConfig,
  private readonly loggerService: LoggerService,
) {}

  findAll(): Course[] {
    return this.courses;
  }

  findOne(id: number): Course {
    const course = this.courses.find((c) => c.id === id);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  create(dto: CreateCourseDto): Course {
    if (dto.credits > this.config.maxCredits) {
      throw new BadRequestException('Maximum credits allowed is 4');
    }

    const course: Course = {
      id: this.nextId++,
      ...dto,
    };

    this.courses.push(course);
    this.loggerService.log(`Course created: ${course.name}`);
    return course;
  }

  update(id: number, dto: UpdateCourseDto): Course {
    const course = this.findOne(id);

    if (
      dto.credits !== undefined &&
      dto.credits > this.config.maxCredits
    ) {
      throw new BadRequestException('Maximum credits allowed is 4');
    }

    Object.assign(course, dto);
    return course;
  }

  remove(id: number): { message: string } {
    const index = this.courses.findIndex((c) => c.id === id);

    if (index === -1) {
      throw new NotFoundException('Course not found');
    }

    this.courses.splice(index, 1);
    this.loggerService.log(`Course deleted: ${id}`);
    return { message: 'Course deleted successfully' };
  }
}
