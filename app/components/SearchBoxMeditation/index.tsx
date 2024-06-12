"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBoxMeditation({ defaultValue = "" }) {
  const [search, setSearch] = useState(defaultValue);
  const router = useRouter();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push("/meditation?search=" + search);
      }}
      className="relative text-white focus-within:text-white flex flex-row-reverse input-shadow rounded-full pt-5 lg:pt-0"
    >
      <input
        type="text"
        name="q"
        className="py-6 lg:py-8 text-lg w-full text-black opacity-75 rounded-full pl-8 focus:outline-none focus:text-black"
        placeholder="search meditations..."
        autoComplete="off"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pt-5 lg:pt-0">
        <button
          type="submit"
          className="p-3 lg:p-5 focus:outline-none focus:shadow-outline bg-ultramarine hover:bg-midnightblue duration-150 ease-in-out rounded-full"
        >
          <Image
            src={"/assets/banner/search.svg"}
            alt="inputicon"
            width={30}
            height={30}
          />
        </button>
      </div>
    </form>
  );
}
