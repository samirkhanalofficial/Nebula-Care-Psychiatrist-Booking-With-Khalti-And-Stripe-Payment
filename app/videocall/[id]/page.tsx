"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/components/Loading";
import { useRouter } from "next/navigation";
const VideoCallScreen = dynamic(() => import("./VideoCallScreen"), {
  ssr: false,
});

export default function Page({ params }: any) {
  const [data, setData] = useState<any>();
  const router = useRouter();
  let firstTime = 0;
  async function getUserDetails() {
    const token = await localStorage.getItem("token");
    if (!token) return router.push("/");
    const res = await fetch("/api/videocall", {
      method: "POST",
      body: JSON.stringify({
        id: params.id,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: token ?? "",
      },
    });
    const dataa = await res.json();
    setData(dataa);
  }
  useEffect(() => {
    if (firstTime == 0) {
      getUserDetails();
      firstTime++;
    }
  }, []);
  if (!data) return <Loading />;
  return (
    <>
      (
      <VideoCallScreen
        meetingId={data!.meetingId!}
        partnerId={data!.partnerId!._id}
        myId={data!.myId!}
        meeting={data!.meeting!}
      />
    </>
  );
}
