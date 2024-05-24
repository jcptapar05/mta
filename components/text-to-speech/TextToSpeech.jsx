import React, { useState, useRef } from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { BsStopCircle } from "react-icons/bs";

const TextToSpeech = ({ text }) => {
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  const audioPlayerRef = useRef(null);

  let lang;

  const [, setVoiceIndex] = useState(null);
  const [productDesc, setProductDesc] = useState(text);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const voiceChangerHandler = async (idx) => {
    if (idx == 1) {
      lang = "en";
      setSelectedIndex(idx);
    }

    if (idx == 9) {
      lang = "fr";
      setSelectedIndex(idx);
    }

    if (idx == 7) {
      lang = "es";
      setSelectedIndex(idx);
    }

    if (idx == 12) {
      lang = "it";
      setSelectedIndex(idx);
    }

    handleStop();
    var url =
      "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=" +
      lang +
      "&dt=t&q=" +
      encodeURI(text);

    const fd = await fetch(url);
    const d = await fd.json();
    let t = " ";
    for (let i = 0; d[0].length > i; i++) {
      t += d[0][i][0];
    }

    setVoiceIndex(voices[idx]);
    setProductDesc(t);
  };

  const [isPlaying, setIsPlaying] = useState(false);

  const [audioURL, setAudioURL] = useState(null);

  const tts = async () => {
    setIsLoading((prev) => (prev = true));
    const options = {
      method: "POST",
      headers: {
        accept: "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": process.env.NEXT_PUBLIC_ELEVANLABS_API,
      },
      body: JSON.stringify({
        text: productDesc,
        voice_settings: {
          similarity_boost: 0,
          stability: 0,
        },
      }),
      responseType: "arraybuffer",
    };

    const response = await fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/in04wCqSzS2Aux1WU2TS",
      options,
    );

    const blob = await response.blob();

    const url = URL.createObjectURL(blob);

    setAudioURL(url);

    if (!response.ok) {
      setIsLoading((prev) => (prev = false));
    }
  };

  const onEndHandler = () => {
    setIsPlaying(false);
  };

  const onPlayHandler = () => {
    setIsLoading((prev) => (prev = false));
    setIsPlaying(true);
  };

  const handleStop = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0 mb-4">
        <p className="uppercase font-bold text-sm">Product Description</p>
        <audio
          className="hidden"
          ref={audioPlayerRef}
          src={audioURL}
          autoPlay
          controls
          onEnded={onEndHandler}
          onPlay={onPlayHandler}
        />
        <div className="flex items-center space-x-0.5">
          {!isPlaying && !isLoading && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={tts}
                    disabled={isLoading}
                  >
                    <img
                      src="/speak.svg"
                      className="w-[25px] h-[25px]"
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Talk</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {!isPlaying && isLoading && (
            <div className="h-10 w-10">
              <img
                src="/Spinner-1s-200px.gif"
                alt=""
                className="w-full h-full mx-auto"
              />
            </div>
          )}

          {isPlaying && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={handleStop}
                  >
                    <BsStopCircle className="text-xl me-2" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>STOP</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          <div className="grid grid-cols-4 md:items-center md:grid-cols-2 gap-1 lg:grid-cols-4">
            <Button
              type="button"
              onClick={() => voiceChangerHandler(1)}
              className={`rounded-sm text-xs py-[12px] px-4 text-black border border-black hover:text-white ${
                selectedIndex == 1 ? "bg-black text-white" : "bg-transparent"
              }`}
            >
              English
            </Button>
            <Button
              type="button"
              onClick={() => voiceChangerHandler(9)}
              className={`rounded-sm text-xs py-[12px] px-4 text-black border border-black hover:text-white ${
                selectedIndex == 9 ? "bg-black text-white" : "bg-transparent"
              }`}
            >
              French
            </Button>
            <Button
              type="button"
              onClick={() => voiceChangerHandler(7)}
              className={`rounded-sm text-xs py-[12px] px-4 text-black border border-black hover:text-white ${
                selectedIndex == 7 ? "bg-black text-white" : "bg-transparent"
              }`}
            >
              Spanish
            </Button>
            <Button
              type="button"
              onClick={() => voiceChangerHandler(12)}
              className={`rounded-sm text-xs py-[12px] px-4 text-black border border-black hover:text-white ${
                selectedIndex == 12 ? "bg-black text-white" : "bg-transparent"
              }`}
            >
              Italian
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TextToSpeech;
