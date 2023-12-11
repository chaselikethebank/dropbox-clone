"use client";

import { FileType } from "@/typings";
import { ColumnDef } from "@tanstack/react-table";
// import { access } from "fs";
import prettyBytes from "pretty-bytes";
// import { render } from "react-dom";
import { fileColorMap } from "@/constants";
import { CopyIcon, DownloadIcon, FileIcon } from "lucide-react";
import { useState } from "react";

// This type is used to define the shape of the data.
// You can use a Zod schema here  too.

const defaultStyles = {
  pdf: { color: "DodgerBlue" },
  doc: { color: "SteelBlue" },
  docx: { color: "SteelBlue" },
  xls: { color: "DarkSlateGray" },
  xlsx: { color: "DarkSlateGray" },
  ppt: { color: "Tomato" },
  pptx: { color: "Tomato" },
  jpg: { color: "Gold" },
  jpeg: { color: "Gold" },
  png: { color: "MediumSeaGreen" },
  gif: { color: "Pink" },
  txt: { color: "Gray" },
  zip: { color: "Chartreuse" },
  mp3: { color: "Red" },
  mp4: { color: "Red" },
  mov: { color: "Red" },
  html: { color: "Tomato" },
  css: { color: "DodgerBlue" },
  js: { color: "Gold" },
  ts: { color: "RoyalBlue" },
  json: { color: "SteelBlue" },
  xml: { color: "DodgerBlue" },
  sql: { color: "MediumPurple" },
  py: { color: "DodgerBlue" },
  java: { color: "FireBrick" },
  ico: { color: "MediumSeaGreen" },
  woff: { color: "Peru" },
  woff2: { color: "DarkSlateBlue" },
  eot: { color: "Peru" },
  ttf: { color: "DarkSlateBlue" },
  map: { color: "Gray" },
  otf: { color: "Chocolate" },
  webp: { color: "MediumOrchid" },
  ics: { color: "DodgerBlue" },
  csv: { color: "DodgerBlue" },
  yaml: { color: "GoldenRod" },
  yml: { color: "GoldenRod" },
  jsx: { color: "Gold" },
  tsx: { color: "RoyalBlue" },
  graphql: { color: "MediumVioletRed" },
  mjs: { color: "Gold" },
  scss: { color: "DodgerBlue" },
  less: { color: "MidnightBlue" },
  styl: { color: "IndianRed" },
  xslt: { color: "DodgerBlue" },
  rss: { color: "Orange" },
  atom: { color: "MediumSeaGreen" },
  md: { color: "DarkBlue" },
  svg: { color: "Chocolate" },
  eps: { color: "MediumOrchid" },
  tiff: { color: "MediumSeaGreen" },
  bmp: { color: "SlateGray" },
  avi: { color: "Red" },
  flv: { color: "Red" },
  webm: { color: "Red" },
  wav: { color: "DodgerBlue" },
  odt: { color: "SteelBlue" },
  ods: { color: "DarkSlateGray" },
  odp: { color: "Tomato" },
  epub: { color: "Tomato" },
  default: { color: "DarkGray" },
  };

export const columns: ColumnDef<FileType>[] = [
{ 
    accessorKey: "type",
    header: "Type",
    cell: ({ renderValue, ...props }) => {
        const type = renderValue() as string;
        const extension: string = type.split("/")[1];
        return (
            <div className="w-10 ">
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
          
          <DownloadIcon className="m-auto" />
        </a>
      );
    },
  },
  // {
  //   accessorKey: "downloadURL",
  //   header: "Copy Link",
  //   cell: ({ renderValue, ...props }) => {
  //     const [isCopied, setIsCopied] = useState(false);

  //     const handleCopy = async (url: string) => {
  //       try {
  //         await navigator.clipboard.writeText(url);
  //         setIsCopied(true);
  //       } catch (error) {
  //         console.error("Error copying link:", error);
  //       }
  //     };

  //     return (
  //       <button
  //         className={`text-blue-500 hover:text-blue-600 ${
  //           isCopied ? "text-green-500" : ""
  //         }`}
  //         onClick={() => handleCopy(renderValue() as string)}
  //       >
  //         <CopyIcon style={{ color: isCopied ? "green" : "DodgerBlue" }} />
  //       </button>
  //     );
  //   },
  // },
];
