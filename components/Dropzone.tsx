"use client";
import { db, storage } from "@/firebase";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import DropzoneComponent from "react-dropzone";


function Dropzone() {

    const [loading, setLoading ] = useState<boolean>(false)
    const { isLoaded, isSignedIn, user } = useUser();

    const onDrop = (acceptedFiles: File[]) => {

        acceptedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onabort = () => console.log("file reading was aborted");
            reader.onerror = () => console.log("file reading has failed");
            reader.onload = async () => {
                await uploadPost(file)
            }
        });
    }

    const uploadPost = async (selectedFile: File) => {
        if (loading) return;
        if (!user) return;
      
        setLoading(true);
      
        try {
          // Add doc -> users/12345/files
          const docRef = await addDoc(collection(db, 'users', user.id, 'files'), {    
            userId: user.id,
            fileName: selectedFile.name,
            fullName: user.fullName,
            profileImage: user.imageUrl, 
            createdAt: serverTimestamp(),
            type: selectedFile.type,
            size: selectedFile.size,
          });
      
          const storageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);
      
          await uploadBytes(storageRef, selectedFile);
      
          const downloadedUrl = await getDownloadURL(storageRef);
          console.log('Downloaded URL:', downloadedUrl);
        } catch (error) {
          console.error('Error uploading file:', error);
        } finally {
          setLoading(false);
        }
      };
      

  const maxSize = 2097152;

  return (
    <DropzoneComponent
      minSize={0}
      maxSize={maxSize}
      onDrop={onDrop}
    >
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;

        return (
          <section className="m-4">
            <div
              {...getRootProps()}
              className={cn(
                "w-full h-52 flex justify-center items-center border-2  border-gray-300 border-dashed rounded-lg text-center",
                isDragActive ? "bg-[#035ffe] animate-pulse text-white" : ""
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop an asset to upload!"}
              {isDragActive && !isDragReject && "Drop to upload this asset!"}
              {isDragReject && "File type not accepted, sorry!"}
              {isFileTooLarge && (
                <div className="text-danger mt-2">File is too large.</div>
              )}
            </div>
          </section>
        );
      }}
    </DropzoneComponent>
  );
}

export default Dropzone;
function uploadPost(file: File) {
    throw new Error("Function not implemented.");
}

