import React from 'react';
import { auth } from '@clerk/nextjs';
import Dropzone from '@/components/Dropzone';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { FileType } from '@/typings';
import TableWrapper from '@/components/table/TableWrapper';


async function Dashboard() {
  const { userId } = auth();

  const docsResults = await getDocs(collection(db, 'users', userId!, 'files'));
  // Implicit {} to []
  const skeletonFiles: FileType[] = docsResults.docs.map((doc) => ({
    id: doc.id,
    filename: doc.data().filename || doc.id,
    timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    fullName: doc.data().fullName,
    downloadURL: doc.data().downloadURL,
    type: doc.data().type,
    size: doc.data().size,
  }));

  const arrayOfAds = [ 'https://firebasestorage.googleapis.com/v0/b/drop-bucket-cf27c.appspot.com/o/users%2Fuser_2Ym9eI6dO0qZwyEp1pRIoWMiuoq%2Ffiles%2FBpKHImMH6FK9N78ppmWt?alt=media&token=214f70df-dd93-4232-a81f-147503a1c89d', 'https://firebasestorage.googleapis.com/v0/b/drop-bucket-cf27c.appspot.com/o/users%2Fuser_2Ym9eI6dO0qZwyEp1pRIoWMiuoq%2Ffiles%2FlafSslVl2pN6KIzwzYMt?alt=media&token=ce7a50a9-ba9f-48ad-b948-e868a022e0f0', 'https://firebasestorage.googleapis.com/v0/b/drop-bucket-cf27c.appspot.com/o/users%2Fuser_2Ym9eI6dO0qZwyEp1pRIoWMiuoq%2Ffiles%2FX0vBsYmNrnWINHh301Bp?alt=media&token=60d24325-420f-4dc7-887a-9184b1ad69fe']
  const adUrl = arrayOfAds[Math.floor(Math.random() * arrayOfAds.length)]
  

  // console.log(docsResults, "docsResults from dashboard.tsx")
  return (
    <div className='border-1'>
      <div className='max-h-192 '>
      <img
          src={adUrl}
          alt='ad from nike'
          className='object-cover w-192 max-h-192 mx-auto py-10'
          />
      </div>
     
      <section className='container space-y-5'>
      
        {/* <h2 className='font-bold'>Assets</h2> */}
        <div>
          <TableWrapper skeletonFiles={skeletonFiles} />
        </div>
      
      </section>
      <Dropzone />
      <div className='flex justify-center p-4'>
        share
       </div>
    </div>
  );
}

export default Dashboard;
