import { FileType } from '@/typings'
import React from 'react'
import { Button } from '../ui/button'
import { columns } from './columns'
import { DataTable } from './table'

function TableWrapper( { skeletonFiles }: { skeletonFiles: FileType[] }) {
// console.log('beggining of skeletonFiles log', skeletonFiles, 'skeletonFiles from table wrapper ')
  return (
    <div>
        <Button className='mb-6'>Sort by ...</Button>

        <DataTable columns={columns} data={skeletonFiles} /> 

        

    </div>
  )
}

export default TableWrapper