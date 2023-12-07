import { FileType } from '@/typings'
import React from 'react'
import { Button } from '../ui/button'

function TableWrapper(

    { skeletonFiles }: { skeletonFiles: FileType[] }
) {
  return (
    <div>

        <Button>Sort by ...</Button>

        {/* data table */}

        {/* <DataTable columns={columns} data={initialFiles} /> */}

    <div>
        {skeletonFiles.map((file) => (<div>{file.filename}</div>))}
    </div>

    </div>
  )
}

export default TableWrapper