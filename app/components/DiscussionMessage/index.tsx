"use client";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DiscussionMessage() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="relative text-white focus-within:text-white flex flex-row-reverse input-shadow rounded-full pt-5 lg:pt-0"
    >
      <input
        type="text"
        name="q"
        className="py-6 lg:py-8 text-lg w-full text-black opacity-75 rounded-full pl-8 focus:outline-none focus:text-black"
        placeholder="Type your message..."
        autoComplete="off"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pt-5 lg:pt-0">
        <button
          type="submit"
          className="p-3 lg:p-5 focus:outline-none focus:shadow-outline bg-ultramarine hover:bg-midnightblue duration-150 ease-in-out rounded-full"
        >
          <PaperAirplaneIcon width={20} />{" "}
        </button>
      </div>
    </form>
  );
}
