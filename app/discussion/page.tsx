"use client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import Link from "next/link";
import Banner2 from "../components/Banner2";
export default function Discussion() {
  const [query, setQuery] = useState("");
  const [isloading, setloading] = useState(true);
  const [max, setMax] = useState(8);
  const [isPosting, setposting] = useState(false);
  const [discussions, setDiscussions] = useState<
    {
      email: string;
      question: string;
      _id: string;
    }[]
  >([]);
  const router = useRouter();

  async function getData() {
    const token = await localStorage.getItem("token");
    if (!token) return router.push("/login");
    const res = await fetch("/api/discussion/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token || "",
      },
    });
    if (res.status != 200) {
      toast.error("Error getting Discussions");
      setloading(false);
    } else {
      const data = await res.json();
      console.log(data);
      setDiscussions(data);
      setloading(false);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  async function addPost(e: FormEvent) {
    e.preventDefault();
    setposting(true);
    const token = await localStorage.getItem("token");
    const res = await fetch("/api/discussion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token || "",
      },
      body: JSON.stringify({ question: query }),
    });
    if (res.status != 200) {
      const dis = await res.json();
      toast.error(dis.message);
      setposting(false);
    } else {
      toast.success("Query Added Successfully");
      setQuery("");
      const dis = await res.json();
      setDiscussions([dis, ...discussions]);
      setposting(false);
    }
  }
  if (isloading)
    return (
      <center>
        <br />
        <br />
        <br />
        <Loading />
      </center>
    );
  return (
    <main>
      <Banner2 />
      <br /> <br /> <br />
      <div className="w-4/5 mx-auto">
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-5">
          {discussions.slice(0, max).map((discussion) => (
            <div key={discussion._id} className="h-full">
              <div className={"shadow-lg px-5 pt-5 rounded-3xl  h-full"}>
                <b>Anonymous User</b>
                <br />
                <p className="line-clamp-1 text-ellipsis">
                  <small>{discussion.question}</small>
                </p>
                <br />
                <Link
                  className=" p-2 w-full block text-center hover:bg-slate-50 hover:rounded-2xl transition-all duration-75"
                  href={"/discussions/" + discussion._id}
                >
                  View Discussion
                </Link>
              </div>
              <br />
            </div>
          ))}
        </div>
        <br />
        <br />
        <center>
          {discussions.length > max && (
            <button
              onClick={() => {
                if (discussions.length > max) {
                  setMax(max + 8);
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-300 text-white py-4 px-10 rounded-2xl"
            >
              View More
            </button>
          )}
        </center>
      </div>
    </main>
  );
}
