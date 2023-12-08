"use client";

import { FileType } from "@/typings";
import { ColumnDef } from "@tanstack/react-table";
import { access } from "fs";
import prettyBytes from "pretty-bytes";
import { render } from "react-dom";
import { fileColorMap } from "@/constants";
import { FileIcon } from "lucide-react";

// This type is used to define the shape of the data.
// You can use a Zod schema here  too.

const defaultStyles = {
    pdf: { color: "red" },
    doc: { color: "blue" },
  };

export const columns: ColumnDef<FileType>[] = [
{ 
    accessorKey: "type",
    header: "Type",
    cell: ({ renderValue, ...props }) => {
        const type = renderValue() as string;
        const extension: string = type.split("/")[1];
        return (
            <div className="w-10">
                <FileIcon 
                extension={extension}
                labelcolor={fileColorMap[extension]}
                // @ts-ignore
                {...defaultStyles[extension]}
                />
            </div>
        )
    }
},
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
