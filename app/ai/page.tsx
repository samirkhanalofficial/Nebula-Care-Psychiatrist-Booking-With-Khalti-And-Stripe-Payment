"use client";

import { set } from "mongoose";
import React, { useEffect, useState } from "react";

export default function AI() {
  const [state, setState] = React.useState<"record" | "stop" | "ideal">(
    "ideal"
  );
  let [audioStream, setAudioStream] = useState<MediaStream>();
  const [aiResponseUrl, setAiResponseUrl] = React.useState<string>();
  const [playingAudio, setPlayingAudio] = useState<boolean>(false);
  let mediaRecorder: MediaRecorder | null = null;
  function recordAudio() {
    console.log("Recording audio...");
    setState("record");

    console.log("Using existing audio stream");
    if (audioStream) {
      mediaRecorder = new MediaRecorder(audioStream, {
        mimeType: "audio/webm;codecs=opus",
      });
      let chunks: BlobPart[] = [];

      mediaRecorder.onstart = () => {
        console.log("MediaRecorder started");
        // setState("record");
        chunks = [];
        setTimeout(() => {
          stopAudio();
        }, 5 * 1000);
      };
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        // const newurl = URL.createObjectURL(blob);
        // setAiResponseUrl(newurl);
        // return;

        // Convert webm to mp3 using ffmpeg.wasm or similar (not natively supported in browser)
        // For now, download as webm. For mp3, use a backend or ffmpeg.wasm.
        const formdata = new FormData();
        formdata.append("audio", blob, "recorded-audio.webm");
        const response = await fetch("http://localhost:3000/voice-to-voice", {
          method: "POST",
          body: formdata,
        });
        if (response.ok) {
          const audioBlob = await response.blob();
          const url = URL.createObjectURL(audioBlob);
          setAiResponseUrl(url);
        } else {
          console.error("Error processing audio:", response.statusText);
        }
      };
      console.log("starting media recorder");
      mediaRecorder?.start();
    }
  }
  function stopAudio() {
    console.log("Stopping audio...");
    mediaRecorder?.stop();
    setState("stop");
  }
  function init() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        setAudioStream(stream);

        // You can now use the audio stream, e.g., for recording or visualization
      })
      .catch((err) => {
        console.error("Error accessing microphone:", err);
        setState("stop");
      });
  }

  useEffect(() => init(), []);
  return (
    <div className="py-20 flex justify-center items-center">
      {aiResponseUrl && (
        <audio
          onPlay={() => setPlayingAudio(true)}
          onEnded={() => {
            recordAudio();
            setPlayingAudio(false);
          }}
          src={aiResponseUrl}
          autoPlay
        ></audio>
      )}
      {(state == "record" || playingAudio) && (
        <div className="absolute animate-pulse rounded-full w-32 h-32 flex justify-center items-center border-2 border-blue-500"></div>
      )}
      {(state == "record" || playingAudio) && (
        <div className="absolute scale-110 animate-pulse rounded-full w-32 h-32 flex justify-center items-center border-2 border-blue-500"></div>
      )}
      {(state == "record" || playingAudio) && (
        <div className="absolute scale-90 animate-pulse rounded-full w-32 h-32 flex justify-center items-center border-2 border-blue-500"></div>
      )}
      {(state == "record" || playingAudio) && (
        <div className="absolute scale-120 animate-pulse rounded-full w-32 h-32 flex justify-center items-center border-2 border-blue-500"></div>
      )}
      <div
        onClick={() => state == "ideal" && recordAudio()}
        className="w-28 z-20 h-28 cursor-pointer font-bold rounded-full bg-blue-500 flex justify-center items-center p-5 text-white"
      >
        {!playingAudio && audioStream
          ? state == "record"
            ? "RECORDING"
            : state == "stop"
            ? "PROCESSING"
            : "START"
          : ""}

        {playingAudio ? "AI" : ""}
      </div>
    </div>
  );
}
