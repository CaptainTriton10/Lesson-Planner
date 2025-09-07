'use client';

import { getPeriodName } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { SquarePen, Trash } from 'lucide-react';

export type Lesson = {
  period: number;
  title: string;
  location: string;
  notes: string;
  main: string;
};

export const columns: ColumnDef<Lesson>[] = [
  {
    id: 'period',
    header: 'Period',
    size: 25,
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
            <b>{lesson.title}</b>
          </span>
          <span className="text-xs text-muted-foreground">
            {lesson.location}
          </span>
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
          <span>{lesson.main}</span>
          <span className="text-muted-foreground text-xs">
            <i>Note: {lesson.notes}</i>
          </span>
        </div>
      );
    },
  },
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
];
