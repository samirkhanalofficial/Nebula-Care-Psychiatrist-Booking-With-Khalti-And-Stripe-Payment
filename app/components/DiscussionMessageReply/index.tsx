"use client";
import useAuth from "@/hooks/useAuth";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../Loading";

export function DiscussionMessageReply({ id }: { id: string }) {
  const { isSignedIn, token } = useAuth();
  const [query, setQuery] = useState("");
  const [isPosting, setposting] = useState(false);
  async function addDiscussionReply(e: FormEvent) {
    e.preventDefault();
    setposting(true);
    try {
      if (!isSignedIn) throw "Please login First";

      const res = await fetch("/api/discussion/" + id + "/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token || "",
        },
        body: JSON.stringify({ comment: query }),
      });
      const dis = await res.json();
      if (res.status != 200) {
        throw dis.message;
      } else {
        toast.success("Reply Added Successfully");
        window.location.href = "/discussion/" + id;
      }
    } catch (e: any) {
      toast.error(e.toString());
    } finally {
      setposting(false);
    }
  }
  if (id == "" || !id) return <></>;
  return (
    <form
      onSubmit={addDiscussionReply}
      className="relative text-white focus-within:text-white flex flex-row-reverse input-shadow rounded-full pt-5 lg:pt-0"
    >
      <input
        type="text"
        name="q"
        className="py-6 lg:py-8 text-lg w-full text-black opacity-75 rounded-full pl-8 focus:outline-none focus:text-black"
        placeholder="Type your suggestion..."
        autoComplete="off"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pt-5 lg:pt-0">
        <button
          type="submit"
          className="p-3 lg:p-5 focus:outline-none focus:shadow-outline bg-ultramarine hover:bg-midnightblue duration-150 ease-in-out rounded-full"
        >
          {!isPosting && <PaperAirplaneIcon width={20} />}
          {isPosting && (
            <div className="w-10 h-10">
              <Loading color="white" onlySpinner={true} />
            </div>
          )}{" "}
        </button>
      </div>
    </form>
  );
}
