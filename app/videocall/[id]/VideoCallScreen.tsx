"use client";
import React, { useEffect, useState } from "react";

import Peer from "peerjs";
import { PhoneIcon, StarIcon } from "@heroicons/react/24/outline";
export default function VideoCallScreen({
  meetingId,
  partnerId,
  myId,
  meeting,
}: {
  meetingId: string;
  partnerId: string;
  myId: string;
  meeting: any;
}) {
  const [isRight, setIsRight] = useState(true);
  const peer = new Peer(meetingId + myId);
  peer.on("open", (conn) => {
    console.log("connected peer as " + conn);
  });
  const enterFullScreen = () => {
    const element = document.documentElement; // The root element
    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
  };
  useEffect(() => {
    console.log(
      "meeting: " + meetingId + " partner : " + partnerId + " me : " + myId
    );
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    peer.on("connection", (conn) => {
      console.log("connected to : " + conn);
    });
    peer.on("call", (call) => {
      setIsCalling(true);
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: true,
        })
        .then((stream) => {
          const myVideo = document.getElementById(
            "myVideo"
          ) as HTMLVideoElement;
          myVideo.srcObject = stream;
          myVideo.play();
          myVideo.muted = true;
          call.answer(stream);
          call.on("stream", (remoteStream) => {
            const remoteVideo = document.getElementById(
              "remoteVideo"
            ) as HTMLVideoElement;
            remoteVideo.srcObject = remoteStream;
            remoteVideo.play();
            console.log("playing remote by call");
          });
        });
    });
  });
  const [isCalling, setIsCalling] = useState(false);
  function myCall() {
    setIsCalling(true);
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then(async (stream) => {
        const myVideo = document.getElementById("myVideo") as HTMLVideoElement;
        myVideo.srcObject = stream;
        myVideo.play();
        myVideo.muted = true;
        console.log("connecting to  " + meetingId + partnerId);

        var call = await peer.call(meetingId + partnerId, stream);
        call.on("stream", (remoteStream) => {
          const remoteVideo = document.getElementById(
            "remoteVideo"
          ) as HTMLVideoElement;
          remoteVideo.srcObject = remoteStream;
          remoteVideo.play();
          console.log("playing remote by button");
        });
      });
  }
  return (
    <div
      className={
        "md:flex w-screen h-screen z-50 bg-white fixed top-0 bottom-0 left-0 right-0 p-5 min-h-screen"
      }
    >
      <div
        className={
          "bg-black w-full h-full absolute right-0  left-0 top-0 bottom-0 md:relative md:w-w/3 aspect-video md:rounded-2xl"
        }
      >
        <video
          className="w-full h-full object-contain"
          id="remoteVideo"
        ></video>
      </div>
      <div
        className={"p-10 md:w-1/3 w-full absolute md:relative left-0 bottom-0 "}
      >
        <div className="hidden md:block">
          <span className={"text-3xl font-bold"}>About This Call</span>
          <br />
          <b>Dr Name: </b>
          {meeting.doctorName} <br />
          <b>Client Name: </b>
          {meeting.clientName} <br />
          <b>Client Age: </b>
          {meeting.clientAge}
          <br />
        </div>
        <div>
          <div className={isCalling ? "block" : "hidden"}>
            <div
              className={
                "w-full flex " + (isRight ? "justify-end" : "justify-start")
              }
            >
              <video
                onClick={(e) => {
                  setIsRight((prev) => !prev);
                }}
                className="rounded-2xl w-32 h-72 bg-black  md:relative md:w-full md:aspect-video"
                id="myVideo"
              ></video>
            </div>
            <br />
            <div className="m-1 p-1 ">
              <center>
                <button
                  onClick={() => window.close()}
                  className="rounded-2xl cursor-pointer flex items-center justify-center space-x-5 bg-red px-8 py-4 text-white hover:shadow-md"
                >
                  <PhoneIcon width={20} />
                  <span>End Call</span>
                </button>
              </center>
            </div>
          </div>
          {isCalling ? (
            <></>
          ) : (
            <>
              <br />

              <button
                className={
                  "bg-blue-500 hover:bg-blue-700 active:bg-blue-800 flex  space-x-3 items-center justify-center px-10 py-4 rounded-2xl text-white"
                }
                onClick={() => {
                  enterFullScreen();
                  myCall();
                }}
              >
                <PhoneIcon width={16} />
                <span>Make this Call</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
