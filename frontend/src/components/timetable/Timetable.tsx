'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function Timetable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="overflow-hidden rounded-md border">
        <LessonTable table={table} columns={columns} />
      </div>
    </>
  );
}

type TableProps = {
  table: any;
  columns: any;
};

function LessonTable(props: TableProps) {
  return (
    <Table>
      <TableHeader>
        {/*//@ts-expect-error*/}
        {props.table.getHeaderGroups().map((headerGroup) => (
          <>
            <TableRow key={headerGroup.id} className="divide-x">
              {/*// @ts-expect-error*/}
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          </>
        ))}
      </TableHeader>
      <TableBody>
        {props.table.getRowModel().rows?.length ? (
          // @ts-expect-error
          props.table.getRowModel().rows.map((row) => (
            <ContextMenu key={row.id}>
              <ContextMenuTrigger asChild>
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="divide-x cursor-pointer"
                  onClick={() => console.log(row.original)}
                >
                  {/*// @ts-expect-error*/}
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="h-25" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </ContextMenuTrigger>
              <ActionMenu
                actionType={row.original.name ? 'edit' : 'new'}
                row={row}
              />
            </ContextMenu>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={props.columns.length}
              className="h-24 text-center border-r"
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

type ActionMenuProps = {
  actionType: 'new' | 'edit';
  row: any;
};

function ActionMenu(props: ActionMenuProps) {
  if (props.actionType === 'edit') {
    return (
      <ContextMenuContent>
        <ContextMenuLabel>Actions</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>Edit Lesson</ContextMenuItem>
        <ContextMenuItem>Delete Lesson</ContextMenuItem>
      </ContextMenuContent>
    );
  } else if (props.actionType === 'new') {
    return (
      <ContextMenuContent>
        <ContextMenuLabel>Actions</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>New Lesson</ContextMenuItem>
      </ContextMenuContent>
    );
  }
}

export default Timetable;
