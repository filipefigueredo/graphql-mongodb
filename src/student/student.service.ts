import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentInput } from './student.input';
import { v4 as uuidV4 } from 'uuid';

export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: MongoRepository<Student>,
  ) {}

  getStudent(id: string) {
    return this.studentRepository.findOne({ where: { id } });
  }

  getStudents() {
    return this.studentRepository.find();
  }

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName, birthDate } = createStudentInput;

    const student: Student = this.studentRepository.create({
      id: uuidV4(),
      firstName,
      lastName,
      birthDate,
    });

    await this.studentRepository.save(student);

    return student;
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    return this.studentRepository.find({
      where: {
        id: {
          $in: studentIds,
        },
      },
    });
  }
}
