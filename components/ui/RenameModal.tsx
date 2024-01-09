"use client";

import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

function RenameModal() {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const [isRenameModalOpen, setIsRenameModalOpen, fileId, filename] =
    useAppStore(
      (state: {
        isRenameModalOpen: any;
        setIsRenameModalOpen: any;
        fileId: any;
        filename: any;
      }) => [
        state.isRenameModalOpen,
        state.setIsRenameModalOpen,
        state.fileId,
        state.filename,
      ]
    );

  const renameFile = async () => {
    if(!user || !fileId) return 

    await updateDoc(doc(db, "users", user.id, "files", fileId), {
        filename: input
    })

    setInput("")
    setIsRenameModalOpen(false)
  };

  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => {
        setIsRenameModalOpen(isOpen);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-2">Rename the file </DialogTitle>
          <div className="flex space-x-2 py-3">
            <Input
              id="link"
              defaultValue={filename}
              onChange={(e) => setInput(e.target.value)}
              onKeyDownCapture={(e) => {
                if (e.key === "Enter") {
                  renameFile();
                }
              }}
            />
            <Button
              size="sm"
              className="px-3 flex-1"
              variant={"ghost"}
              onClick={() => setIsRenameModalOpen(false)}
            >
              <span className="sr-only">Cancel</span>
              <span>Cancel</span>
            </Button>
            <Button
              type="submit"
              size="sm"
              className="px-3 flex-1"
              onClick={() => renameFile()}
            >
              <span className="sr-only">Rename</span>
              <span>Rename</span>
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default RenameModal;
