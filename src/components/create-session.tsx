'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export function CreateSession({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [file, setFile] = useState<string | undefined>(undefined);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  }

  console.log(file);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="mx-auto max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Session</DialogTitle>
          <DialogDescription>
            Send a photo of your bill to create a session
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Input
              id="photo-input"
              type="file"
              onChange={handleChange}
              className="hidden"
            />
          </div>
          {file && <img src={file} alt="bill" className="w-full" />}
        </div>
        <DialogFooter className="flex gap-2 my-2">
          <Button
            variant="secondary"
            onClick={() => document.getElementById('photo-input')?.click()}
            className="flex-1"
          >
            Upload Photo
          </Button>
          <Button className="flex-1" disabled={!file}>
            Start Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}