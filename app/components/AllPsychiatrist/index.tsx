"use client";
import React, { Component, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { PsychiatristCard } from "../PsychiatristCard";
import { SearchBox } from "../SearchBox";
import { useSearchParams } from "next/navigation";

export default function AllPsychiatrist() {
  const [isloading, setloading] = useState(true);
  const searchParams = useSearchParams();
  const search = searchParams?.get("search") ?? "";
  const [users, setUsers] = useState<
    {
      age: number;
      email: string;
      fullName: string;
      image: string;
      price: string;
      role: string;
      nmcNumber: string;
      __v: number;
      _id: string;
    }[]
  >([]);
  async function getPsychiatrists() {
    var users = await fetch("/api/get-user/psychiatrists", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (users.status == 200) {
      const data = await users.json();
      setUsers(data);
      setloading(false);
    } else {
      toast.error("error getting datas");
      setloading(false);
    }
  }
  useEffect(() => {
    getPsychiatrists();
  }, []);

  return (
    <div id="courses">
      <div className="mx-auto max-w-7xl sm:py-8 px-4 lg:px-8 ">
        <div className="flex justify-between items-center">
          <h3 className="text-midnightblue text-4xl lg:text-55xl font-semibold mb-5 sm:mb-0">
            Our Psychiatrists.
          </h3>
          <div className="w-full md:pl-80">
            <SearchBox defaultValue={search} />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3">
          {users
            .filter((item) => item.fullName.startsWith(search))
            .map((items, i) => (
              <PsychiatristCard showBest={false} key={i} items={items} />
            ))}
        </div>
        {users.filter((item) => item.fullName.startsWith(search)).length ==
          0 && (
          <center>
            <br />
            <br />
            <br />
            <br />
            <br />
            <h2 className="font-bold">No Psychiatrist Found</h2>
            The search result for your query is Empty.
          </center>
        )}
      </div>
    </div>
  );
}
