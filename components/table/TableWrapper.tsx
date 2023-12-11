'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { columns } from './columns';
import { DataTable } from './table';
import { useUser } from '@clerk/nextjs';
import { FileType } from '@/typings';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';
import { Skeleton } from "@/components/ui/skeleton"


function TableWrapper({ skeletonFiles }: { skeletonFiles: FileType[] }) {
  const { user } = useUser();
  const [initialFiles, setInitialFile] = useState<FileType[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  const [docs, loading, errors] = useCollection(
    user &&
      query(
        collection(db, "users", user.id, "files"),
        orderBy("timestamp", sort)
      )
  );

  useEffect(() => {
    if (!docs) return;
    
  // @ts-ignore
    const files: FileType[] = docs.docs.map((doc) => ({
      id: doc.id,
      filename: doc.data().filename,
      timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
      downloadURL: doc.data().downloadUrl,
      type: doc.data().type,
      size: doc.data().size,
    }));
  
    setInitialFile(files);
  }, [docs]);
  
  if (docs?.docs.length === undefined) 
    return (
      <div className='flex flex-col'>
        <Button variant={"outline"} className='ml-auto w-36 h-10 mb-5' >
        <Skeleton className='h-5 w-full'/>
        </Button>
        <div className='border rounded-lg'>
          <div>
            {skeletonFiles.map((file) => (
              <div 
              key={file.id}
              className='flex items-center space-x-4 p-5 w-full'
              >
                <Skeleton className='h-12 w-12'/>
                <Skeleton className='h-12 w-full'/>
              </div>

            ))}

            {skeletonFiles.length === 0 && (
              <div>
                 <Skeleton className='h-12 w-12'/>
                <Skeleton className='h-12 w-full'/>
                </div>
            )}
          </div>

        </div>
      </div>
      );

  return (
    <div>

      <div className='flex items-center '>
     <h1 className='mr-auto'>My Assets</h1> 
      <Button
      variant={"outline"}
        onClick={() => setSort(sort === "desc" ? "asc" : "desc")}
        className='mb-6'
      >
        Sort by {sort === "desc" ? "Oldest" : "Newest"}
      </Button>
      </div>
      <DataTable columns={columns} data={initialFiles} />
    </div>
  );
}

export default TableWrapper;
