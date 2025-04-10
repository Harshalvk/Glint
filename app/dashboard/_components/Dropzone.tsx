"use client";

import { Upload } from "lucide-react";

export default function Dropzone({
  setSelectedImage,
}: {
  setSelectedImage: (file?: File) => void;
}) {
  return (
    <div className="lg:w-3xl my-10">
      <input
        className="hidden"
        type="file"
        id="file-upload"
        accept="image/*"
        onChange={(e) => setSelectedImage(e.target.files?.[0])}
      />
      <label
        htmlFor="file-upload"
        className="relative flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 p-14"
      >
        <div className="absolute inset-3 rounded-xl  border-2 border-zinc-400 dark:border-zinc-700 border-dashed flex justify-center">
          <div className="flex flex-col items-center justify-center">
            <p className="font-semibold tracking-tight dark:text-zinc-400">Upload file</p>
            <Upload className="dark:text-zinc-400"/>
          </div>
        </div>
      </label>
    </div>
  );
}
