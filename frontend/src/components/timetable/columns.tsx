'use client';

import { getPeriodName } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '../ui/badge';

export type LessonData = {
  name: string;
  title: string;
  period: number;
  room: string;
  notes: string;
  main: string;
};

export const columns: ColumnDef<LessonData>[] = [
  {
    id: 'period',
    header: 'Period',
    cell: ({ row }) => {
      const lesson = row.original;

      return (
        <Badge variant="outline" className="text-xl">
          {getPeriodName(lesson.period)}
        </Badge>
      );
    },
  },
  {
    id: 'class',
    header: 'Class',
    cell: ({ row }) => {
      const lesson = row.original;

      return (
        <div className="flex flex-col">
          <span className="text-lg">
            <b>{lesson.name}</b>
          </span>
          <span className="text-xs text-muted-foreground">{lesson.room}</span>
        </div>
      );
    },
  },
  {
    id: 'details',
    header: 'Lesson Details',
    cell: ({ row }) => {
      const lesson = row.original;

      return (
        <div className="flex flex-col">
          <span>{lesson.title}</span>
          <span className="text-muted-foreground text-xs">
            <i>
              {lesson.notes ? 'Note: ' : ''}
              {lesson.notes}
            </i>
          </span>
        </div>
      );
    },
  },
];

/*
  {
    id: 'actions',
    header: '',
    cell: () => {
      return (
        <div className="flex flex-col gap-2.5">
          <Button variant="secondary">
            <SquarePen />
          </Button>
          <Button variant="destructive">
            <Trash />
          </Button>
        </div>
      );
    },
  },
*/
