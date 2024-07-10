"use client";
import React, { Fragment, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import Loading from "../Loading";
import { SearchBoxMeditation } from "../SearchBoxMeditation";
import { MeditationCard } from "../MeditationCard";
import { Dialog, Transition } from "@headlessui/react";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";

export default function AllMeditations() {
  const [isloading, setloading] = useState(true);
  const { role } = useAuth();
  const [max, setMax] = useState(8);

  const [showDialog, setShowDialog] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");
  const searchParams = useSearchParams();
  const search = searchParams?.get("search") ?? "";
  const [meditations, setMeditations] = useState<
    {
      title: string;
      link: string;
      __v: number;
      _id: string;
    }[]
  >([]);
  async function getMeditations() {
    try {
      setloading(true);
      var req = await fetch("/api/admin/meditation", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await req.json();
      if (req.status == 200) {
        setMeditations(data);
      } else {
        throw data.message;
      }
    } catch (e: any) {
      toast.error(e.toString());
    } finally {
      setloading(false);
    }
  }
  useEffect(() => {
    getMeditations();
  }, []);

  return (
    <>
      <Transition appear show={showDialog} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setShowDialog(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-screen lg:mx-32 lg:my-10 transform overflow-hidden rounded-2xl bg-white p-0 text-left align-middle shadow-xl transition-all">
                  {selectedUrl != "" && (
                    <div className="w-full aspect-video h-full">
                      <iframe
                        src={
                          selectedUrl + "?si=zH3qW6ebQOz6Kiym&amp;controls=1"
                        }
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen={true}
                        aria-disabled
                        className="m-auto w-full h-full aspect-video  overflow-hidden"
                      />
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div id="courses">
        <div className="mx-auto max-w-7xl sm:py-8 px-4 lg:px-8 ">
          <div className="flex justify-between items-center">
            <h3 className="text-midnightblue text-4xl lg:text-55xl font-semibold mb-5 sm:mb-0">
              Meditations.
            </h3>
            <div className="w-full md:pl-80">
              <SearchBoxMeditation defaultValue={search} />
            </div>
          </div>
          <br />
          {role == "admin" && (
            <div className="flex items-center justify-end">
              <Link
                className="px-10 py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-2xl"
                href="/meditation/add"
              >
                Add Meditation
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {meditations
              .filter((item) =>
                item.title
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase())
              )
              .slice(0, max)
              .map((item, i) => (
                <MeditationCard
                  onClick={() => {
                    console.log("who");
                    setSelectedUrl(item.link);
                    setShowDialog(true);
                  }}
                  isAdmin={role == "admin"}
                  key={i}
                  item={item}
                />
              ))}
          </div>
          {isloading && <Loading />}
          {!isloading &&
            meditations
              .filter((item) =>
                item.title
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase())
              )
              .slice(0, max).length == 0 && (
              <center>
                <br />
                <br />
                <br />
                <br />
                <br />
                <h2 className="font-bold">No Meditations Found</h2>
                The search result for your query is Empty.
              </center>
            )}
          <center>
            {meditations.filter((item) =>
              item.title
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase())
            ).length > max && (
              <button
                onClick={() => {
                  if (
                    meditations.filter((item) =>
                      item.title
                        .toLocaleLowerCase()
                        .includes(search.toLocaleLowerCase())
                    ).length > max
                  ) {
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
      </div>
    </>
  );
}
