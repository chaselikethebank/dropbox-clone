"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { FileType } from "@/typings";
import { Pencil, PencilIcon, TrashIcon } from "lucide-react";
import { useAppStore } from "@/store/store";
import { DeleteModal } from "../ui/DeleteModal";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [setIsDeleteModalOpen, setFileId, setFilename, setIsRenameModalOpen] =
    useAppStore((state) => [
      state.setIsDeleteModalOpen,
      state.setFileId,
      state.setFilename,
      state.setIsRenameModalOpen,
    ]);

  const openDeleteModal = (fileId: string) => {
    setFileId(fileId);
    setIsDeleteModalOpen(true);
  };

  const openRenameModal = (fileId: string, filename: string) => {
    setFileId(fileId);
    setFilename(filename);
    setIsRenameModalOpen(true);

  };

  // console.log(data, 'data from table.tsx')

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
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
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() ? "selected" : undefined}
              >
                <DeleteModal />
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.column.id === "timestamp" ? (
                      <div className="flex flex-col">
                        <div className="text-xs m-auto">
                          {(cell.getValue() as Date).toLocaleString("en-US", {
                            month: "numeric",
                            day: "numeric",
                            year: "2-digit",
                          })}
                        </div>
                        <div className="m-auto text-xs">
                          {(cell.getValue() as Date).toLocaleString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })}
                        </div>
                      </div>
                    ) : cell.column.id === "filename" ? (
                      <p
                        onClick={() => {
                          openRenameModal(
                            (row.original as FileType).id,
                            (row.original as FileType).filename
                          );
                        }}
                        className="underline flex item-center text-blue-500 hover:text-blue-600"
                      >
                        {cell.getValue() as string}{" "}
                        <PencilIcon
                          size={14}
                          className="ml-2 m-auto text-white"
                        />
                      </p>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}

                <TableCell key={(row.original as FileType).id}>
                  <Button
                    variant="outline"
                    onClick={() => {
                      openDeleteModal((row.original as FileType).id);
                      // console.log("Delete button clicked");
                    }}
                  >
                    <TrashIcon size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
