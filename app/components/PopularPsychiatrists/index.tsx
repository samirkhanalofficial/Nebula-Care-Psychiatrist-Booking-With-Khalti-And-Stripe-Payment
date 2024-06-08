"use client";
import Slider from "react-slick";
import React, { Component, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { PsychiatristCard } from "../PsychiatristCard";
import AllPsychiatrist from "../AllPsychiatrist";

export default function PopularPsychiatrists() {
  const [isloading, setloading] = useState(true);
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

  return (
    <div id="courses">
      <div className="mx-auto max-w-7xl sm:py-8 px-4 lg:px-8 ">
        <div className="sm:flex justify-between items-center">
          <h3 className="text-midnightblue text-4xl lg:text-55xl font-semibold mb-5 sm:mb-0">
            Popular Psychiatrists.
          </h3>
          <Link
            href={"/"}
            className="text-Blueviolet text-lg font-medium space-links"
          >
            Explore Psychiatrists&nbsp;&gt;&nbsp;
          </Link>
        </div>

        <AllPsychiatrist isPopularPsychiatrists={true} />
      </div>
    </div>
  );
}
