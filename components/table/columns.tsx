"use client";

import { FileType } from "@/typings";
import { ColumnDef } from "@tanstack/react-table";
import { access } from "fs";
import prettyBytes from "pretty-bytes";
import { render } from "react-dom";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "filename",
    header: "File Name",
  },
  {
    accessorKey: "timestamp",
    header: "Date Created",
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ renderValue, ...props }) => {
      return <span>{prettyBytes(renderValue() as number)}</span>;
    },
  },
  {
    accessorKey: "downloadURL",
    header: "Location",
    cell: ({ renderValue, ...props }) => {
      return (
        <a href={renderValue() as string} target="_blank" rel="noreferrer"
        className="underline text-blue-500 hover:text-blue-600">
          Download Asset
        </a>
      );
    },
  },
];
