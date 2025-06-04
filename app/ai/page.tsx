"use client";
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
        if (!audioStream) return;
        let audioContext = new AudioContext();

        let microphone = audioContext.createMediaStreamSource(audioStream);
        let analyser = audioContext.createAnalyser();
        microphone.connect(analyser);
        detectSilence(analyser, microphone, audioContext);
        // setTimeout(() => {
        //   stopAudio();
        // }, 5 * 1000);
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
        const response = await fetch(process.env.AI_URL!, {
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
  function detectSilence(
    analyser: AnalyserNode,
    microphone: MediaStreamAudioSourceNode,
    audioContext: AudioContext
  ) {
    console.log("Detecting silence...");

    const dataArray = new Uint8Array(analyser.fftSize);
    let isDetecting = true;
    let silenceTimer: NodeJS.Timeout | null = null;
    function check() {
      if (!isDetecting) return;
      analyser.getByteTimeDomainData(dataArray);
      // const silence = dataArray.every((v) => Math.abs(v - 128) < 5);

      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        let deviation = dataArray[i] - 128;
        sum += deviation * deviation;
      }

      const rms = Math.sqrt(sum / dataArray.length); // Root Mean Square

      const silence = rms < 10; // Adjust threshold experimentally

      if (silence) {
        console.log("silence found wow");
        if (!silenceTimer) {
          console.log("Silence detected. Stopping...");

          silenceTimer = setTimeout(() => {
            if (isDetecting) {
              console.log("Silence detected. Stopped");

              isDetecting = false; // 👈 stop the loop
              analyser.disconnect();
              microphone.disconnect();
              audioContext.close();
              stopAudio();
            }
          }, 3 * 1000); // 1.5s silence
        }
      } else {
        if (silenceTimer) {
          clearTimeout(silenceTimer);
          silenceTimer = null;
        }
      }

      requestAnimationFrame(check);
    }

    check();
  }

  function stopAudio() {
    console.log("Stopping audio...");
    mediaRecorder?.stop();
    setState("stop");
  }
  function init() {
    navigator.mediaDevices
      .getUserMedia({ audio: { channelCount: 1 } })
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
      {(state === "record" || playingAudio) && (
        <>
          <div
            className="absolute animate-pulse rounded-full w-32 h-32 flex justify-center items-center border-2 border-blue-500"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="absolute animate-pulse rounded-full w-32 h-32 flex justify-center items-center border-2 border-blue-500"
            style={{ animationDelay: "0.4s" }}
          ></div>
          <div
            className="absolute animate-pulse rounded-full w-32 h-32 flex justify-center items-center border-2 border-blue-500"
            style={{ animationDelay: "0.8s" }}
          ></div>
          <div
            className="absolute animate-pulse rounded-full w-32 h-32 flex justify-center items-center border-2 border-blue-500"
            style={{ animationDelay: "1.2s" }}
          ></div>
        </>
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
