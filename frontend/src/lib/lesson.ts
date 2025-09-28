import { getPeriodName } from './utils';
import { LessonData } from '@/components/timetable/columns.tsx';

type LessonJSON = {
  authorId?: string;
  lessonName?: string;
  lessonTitle?: string;
  date?: string;
  period?: number;
  room?: string;
  notes?: string;
  starter?: string;
  main?: string;
  plenary?: string;
};

class Lesson {
  public authorId: string;
  public lessonName: string;
  public lessonTitle: string;
  public date: string;
  public period: number;
  public room: string;
  public notes: string;
  public starter: string;
  public main: string;
  public plenary: string;

  constructor(lesson: LessonJSON) {
    this.authorId = lesson.authorId ? lesson.authorId : '';
    this.lessonName = lesson.lessonName ? lesson.lessonName : '';
    this.lessonTitle = lesson.lessonTitle ? lesson.lessonTitle : '';
    this.date = lesson.date ? lesson.date : '';
    this.period = lesson.period ? lesson.period : 0;
    this.room = lesson.room ? lesson.room : '';
    this.notes = lesson.notes ? lesson.notes : '';
    this.starter = lesson.starter ? lesson.starter : '';
    this.main = lesson.main ? lesson.main : '';
    this.plenary = lesson.plenary ? lesson.plenary : '';
  }

  public getPeriod() {
    return getPeriodName(this.period);
  }

  public getLessonData() {
    const lessonData: LessonData = {
      name: this.lessonName,
      title: this.lessonTitle,
      period: this.period,
      room: this.room,
      notes: this.notes,
      main: this.main,
    };

    return lessonData;
  }
}

export default Lesson;
export { LessonJSON };
