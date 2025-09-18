import { createLessonUrl, getAllLessonsUrl } from '@/lib/urls';
import Lesson, { LessonJSON } from '@/lib/lesson.ts';
import { useEffect, useState } from 'react';
import { columns, LessonData } from '@/components/timetable/columns.tsx';
import Timetable from '@/components/timetable/Timetable.tsx';

async function getAllLessons(token: string | null) {
  if (!token) return [];

  const res = await fetch(getAllLessonsUrl, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const json: LessonJSON[] = await res.json();
  const lessons: Lesson[] = [];
  json.forEach((lesson: LessonJSON) => {
    lessons.push(new Lesson(lesson));
  });

  return lessons;
}

function addLesson(token: string | null) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', createLessonUrl);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', `Bearer ${token}`);
  xhr.send(
    JSON.stringify({
      lessonName: 'Chemistry - States of Matter',
      lessonTitle: 'Understanding Solids, Liquids, and Gases',
      date: '2025-09-18',
      period: 1,
      room: 'Lab A1',
      notes: 'Focus on particle diagrams; remind students about safety rules.',
      starter: 'Quick quiz on changes of state symbols.',
      main: 'Explain particle theory and demonstrate melting ice.',
      plenary: 'Students summarize the differences in groups and share.',
    })
  );
}

function generateBaseLessons(fetchedLessons: Lesson[]) {
  const NUM_LESSONS = 12;
  const baseLessons: Lesson[] = [];

  for (let i = 0; i < NUM_LESSONS; i++) {
    const thisLesson = fetchedLessons.find(
      (lesson: Lesson) => lesson.period == i
    );

    if (thisLesson) {
      baseLessons.push(thisLesson);
    } else {
      const lesson = new Lesson({
        period: i,
      });
      baseLessons.push(lesson);
    }
  }

  return baseLessons;
}

function Today() {
  const token = localStorage.getItem('token');
  const [data, setData] = useState<LessonData[]>([]);

  // addLesson(token);

  useEffect(() => {
    getAllLessons(token).then((lessons: Lesson[]) => {
      const baseLessons = generateBaseLessons(lessons);

      const lessonsAsData: LessonData[] = baseLessons.map((lesson) =>
        lesson.getLessonData()
      );
      setData(lessonsAsData);
    });
  }, [token]);

  return (
    <div className="flex flex-col gap-2.5 p-2.5">
      <div className="w-full h-20 rounded-md border"></div>
      <div className="p-2.5 rounded-md bg-primary-foreground">
        <Timetable columns={columns} data={data} />
      </div>
    </div>
  );
}

export default Today;
