"use client";
import AI from "@/app/ai/page";
import { IoCloseCircleSharp } from "react-icons/io5";
import React, { useState } from "react";
import Image from "next/image";

export default function AiDialog() {
  const CloseIcon = IoCloseCircleSharp as unknown as React.FC<{
    size?: number;
  }>;
  const [showingDialog, setShowingDialog] = useState<boolean>(false);
  return (
    <>
      <div
        onClick={() => setShowingDialog(true)}
        className="fixed  bottom-10  right-10 group flex items-center flex-row-reverse gap-x-2"
      >
        <div className="relative bg-blue-200 w-20 h-20 overflow-hidden text-4xl text-white  group-hover:bg-blue-400 cursor-pointer aspect-square  rounded-full flex items-center justify-center ">
          <Image
            src={"/ai-robot-2.png"}
            alt="NebulaCare AI"
            fill
            className="object-cover"
          />
        </div>
        <div className="hidden group-hover:block p-2 bg-blue-400 text-white rounded-2xl">
          {" "}
          Talk With AI
        </div>
      </div>

      {showingDialog && (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-50 w-screen h-screen bg-white ">
          <div
            className="absolute right-10 top-10 cursor-pointer hover:text-blue-500"
            onClick={() => setShowingDialog(false)}
          >
            <CloseIcon size={30} />
          </div>
          <AI />
        </div>
      )}
    </>
  );
}
