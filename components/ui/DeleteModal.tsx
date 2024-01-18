'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAppStore } from "@/store/store"
import { useUser } from "@clerk/nextjs"
import { deleteObject, ref } from "firebase/storage"
import { db, storage } from "@/firebase"
import { deleteDoc, doc } from "firebase/firestore"
import toast, { Toaster } from 'react-hot-toast';


export function DeleteModal(){  
    const { user } = useUser();


    const [isDeleteModalOpen, setIsDeleteModalOpen, fileId, setFileId] = 
         useAppStore((state) => [
           state.isDeleteModalOpen,
            state.setIsDeleteModalOpen,
            state.fileId,
             state.setFileId,
       ])

async function deleteFile() {
    if (!user || !fileId) return 

    const toastId = toast.loading("Deleting...")

    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

    try {
        await deleteObject(fileRef);
        await deleteDoc(doc(db, "users", user.id, "files", fileId));
        toast.success("Deleted Successfully", {
          id: toastId
        })
        console.log('Firestore document deleted successfully');
      } catch (error) {
        console.error(error);
      }
      setIsDeleteModalOpen(false);
}
  

  

  return (
    <Dialog 
    open={isDeleteModalOpen}
    onOpenChange={(isOpen) => {
        setIsDeleteModalOpen(isOpen)
    }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="m-auto p-4">Destroy this record?</DialogTitle>
          <DialogDescription className="m-auto">
            Doublecheck, please. This is permanent.
          </DialogDescription>
        </DialogHeader>
         <div className="flex space-x-2 py-3">
            <Button
                size="sm"
                className="px-3 flex-1"
                variant={"ghost"}
                onClick={() => setIsDeleteModalOpen(false)}
            >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
            </Button>
            <Button
            type="submit"
            size="sm"
            className="px-3 flex-1"
            variant="destructive"
            onClick={() => deleteFile()}
            >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
            </Button>
         </div>
      
      </DialogContent>
    </Dialog>
  )
}
