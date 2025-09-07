import { columns, Lesson } from '@/components/timetable/columns';
import Timetable from '@/components/timetable/Timetable';

const data: Lesson[] = [
  {
    period: 1,
    title: 'Maths',
    location: 'Y04',
    notes: 'Review fractions and decimals.',
    main: 'Practice converting fractions to decimals with group activities.',
  },
  {
    period: 2,
    title: 'English',
    location: 'Y12',
    notes: 'Bring poetry handouts.',
    main: 'Analyze metaphors and similes in selected poems.',
  },
  {
    period: 3,
    title: 'Science',
    location: 'Lab 2',
    notes: 'Safety goggles required.',
    main: 'Conduct simple chemical reactions and observe changes.',
  },
  {
    period: 4,
    title: 'History',
    location: 'H03',
    notes: 'Prepare slideshow for WWII topic.',
    main: 'Discuss causes of WWII and student-led presentations.',
  },
  {
    period: 5,
    title: 'Geography',
    location: 'G01',
    notes: 'Collect atlases from store room.',
    main: 'Study world climate zones and map reading activity.',
  },
  {
    period: 6,
    title: 'Art',
    location: 'A05',
    notes: 'Bring sketchbooks.',
    main: 'Practice shading techniques using still life objects.',
  },
  {
    period: 7,
    title: 'Geography',
    location: 'G01',
    notes: 'Collect atlases from store room.',
    main: 'Study world climate zones and map reading activity.',
  },
  {
    period: 8,
    title: 'Art',
    location: 'A05',
    notes: 'Bring sketchbooks.',
    main: 'Practice shading techniques using still life objects.',
  },
];

function Today() {
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
