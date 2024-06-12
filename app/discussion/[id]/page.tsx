"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import Loading from "@/app/components/Loading";
import DiscussionReplyBanner from "@/app/components/DiscussionReplyBanner";
export default function Discussion(req: any) {
  const { isSignedIn, token } = useAuth();
  const [isloading, setloading] = useState(true);
  const [max, setMax] = useState(8);
  const [discussion, setDiscussion] = useState<{
    email: string;
    question: string;
    _id: string;
    comment: {
      _id: string;
      email: string;
      reply: string;
    }[];
  }>({
    email: "",
    question: "",
    _id: "",
    comment: [],
  });

  async function getData() {
    const res = await fetch("/api/discussion/" + req.params.id, {
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
      setDiscussion(data);
      setloading(false);
    }
  }
  useEffect(() => {
    getData();
  }, []);

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
      <DiscussionReplyBanner
        id={discussion._id}
        message={discussion.question}
      />
      <br /> <br /> <br />
      <div className="w-4/5 mx-auto">
        <div className="grid grid-cols-1  lg:grid-cols-1 gap-5">
          {discussion?.comment
            .reverse()
            .slice(0, max)
            .map((comment) => (
              <div key={discussion._id} className="h-full">
                <div className={"shadow-lg px-5 pt-5 rounded-3xl  h-full"}>
                  <b>Anonymous User</b>
                  <br />
                  <p className="">
                    <small>{comment.reply}</small>
                  </p>
                  <br />
                </div>
                <br />
              </div>
            ))}
        </div>
        <br />
        <br />
        <center>
          {(discussion?.comment.length ?? 0) == 0 && (
            <center>
              <h2 className="text-2xl">No Comments Yet</h2>
              <span>
                Helping client is a good way to let them know you. But comments
                are Anonymous, so Mention your name at the end to raise
                conversion.
              </span>
            </center>
          )}
          {(discussion?.comment.length ?? 0) > max && (
            <button
              onClick={() => {
                if ((discussion?.comment.length ?? 0) > max) {
                  setMax(max + 8);
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-300 text-white py-4 px-10 rounded-2xl"
            >
              View older Replies
            </button>
          )}
        </center>
      </div>
    </main>
  );
}
