"use client";
import { db, storage } from "@/firebase";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { set } from "firebase/database";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import DropzoneComponent from "react-dropzone";

// ... (other imports)

function Dropzone() {
  const [loading, setLoading] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  const onDrop = async (acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    for (const file of acceptedFiles) {
      try {
        const reader = new FileReader();

        reader.onload = async () => {
          await uploadPost(file);
        };

        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Error reading file:", error);
      }
    }
  };

  const uploadPost = async (selectedFile: File) => {
    if (loading) return console.log("currently uploading file.");
    if (!user) return console.log("No user signed in.");

    setLoading(true);

    try {
      console.log("selected file name: " + selectedFile.name);

      const docRef = await addDoc(collection(db, "users", user.id, "files"), {
        userId: user.id,
        filename: selectedFile.name,
        fullName: user.fullName,
        profileImage: user.imageUrl,
        timestamp: serverTimestamp(),
        type: selectedFile.type,
        size: selectedFile.size,
      });

      console.log("Firestore document added. Document ID:", docRef.id);

      const storageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);

      await uploadBytes(storageRef, selectedFile).then(async (snapshot) => {
        const downloadUrl = await getDownloadURL(storageRef);

        await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
          downloadUrl: downloadUrl,
        });
      });

      const downloadedUrl = await getDownloadURL(storageRef);
      console.log("Downloaded URL:", downloadedUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
      console.log("Done uploading file.");
    }
  };

  const maxSize = 2097152;

  //   for the drag and drop of everything in the dropzone
  return (
    <DropzoneComponent minSize={0} maxSize={maxSize} onDrop={onDrop}>
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
