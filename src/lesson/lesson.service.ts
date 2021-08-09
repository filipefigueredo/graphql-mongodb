import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateLessonInput } from './lesson.input';
import { AssingStudentsToLesson } from './assign-students-to-lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: MongoRepository<Lesson>,
  ) {}

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, students } = createLessonInput;

    const lesson: Lesson = this.lessonRepository.create({
      id: uuidv4(),
      name,
      startDate,
      endDate,
      students,
    });

    await this.lessonRepository.save(lesson);

    return lesson;
  }

  async getLesson(id: string): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({ where: { id } });

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID "${id}" not found`);
    }

    return lesson;
  }

  async getLessons(): Promise<Lesson[]> {
    return await this.lessonRepository.find();
  }

  async assignStudentsToLesson(
    assingStudentsToLesson: AssingStudentsToLesson,
  ): Promise<Lesson> {
    const { lessonId, studentsId } = assingStudentsToLesson;

    const lesson = await this.lessonRepository.findOne({
      where: { id: lessonId },
    });

    lesson.students = [...lesson.students, ...studentsId];

    return this.lessonRepository.save(lesson);
  }
}
