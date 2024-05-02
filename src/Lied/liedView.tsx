import React, { useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Hola } from "../interfaces";
import "./lied.css";

import { FaSpinner } from "react-icons/fa";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import AudioProgressBar from "./progressBar";
import { MdEdit } from "react-icons/md";
import { TbReload } from "react-icons/tb";
import { BiSolidCommentDetail } from "react-icons/bi";

interface liedView {
  data: Hola[];
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  audioRef: React.RefObject<HTMLAudioElement>;
  setIsReady: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  isReady: boolean;
  togglePlayPause: () => void;
  isPlaying: boolean;
  setCurrrentProgress: React.Dispatch<React.SetStateAction<number>>;
  handleBufferProgress: React.ReactEventHandler<HTMLAudioElement>;
  duration: number;
  currrentProgress: number;
  buffered: number;
  songIndex: number;
  songCount: number;
  durationDisplay: string;
  elapsedDisplay: string;
  audio: string;
  setAudio: React.Dispatch<React.SetStateAction<string>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModalKommentare: React.Dispatch<React.SetStateAction<boolean>>;
  level: string;
}

const LiedView: React.FC<liedView> = ({
  data,
  setDuration,
  audioRef,
  setIsReady,
  setIsPlaying,
  isReady,
  togglePlayPause,
  isPlaying,
  setCurrrentProgress,
  handleBufferProgress,
  duration,
  currrentProgress,
  buffered,
  songIndex,
  songCount,
  durationDisplay,
  elapsedDisplay,
  audio,
  setAudio,
  setOpenModal,
  setOpenModalKommentare,
  level
}) => {
  const datei = data[0];

  useEffect(() => {
    if (datei?.audios?.length === 1) {
      setAudio(datei?.audios[0]);
    }
  });

  const reload = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAudio("");
    setIsPlaying(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center">
        <TransformWrapper>
          <TransformComponent>
            <img
              className="text-align-center"
              src={datei?.img}
              style={{
                maxWidth: "85vh",
                width: "100%",
                maxHeight: "100%",
                cursor: "zoom-in",
                transition: "transform 0.25s ease",
              }}
            />
          </TransformComponent>
        </TransformWrapper>
      </div>
      <div className="container"></div>

      <div className="border rounded fuerte p-3">
        <div className="col row ">
          <div className="row titles col-auto me-auto">
            <div className=" mt-3 text-center">
              <div className="row">
                <div className="col-auto d-flex justify-content-center align-items-center">
                  <p className="port" style={{ alignItems: "center" }}>
                    {datei?.name}
                  </p>
                </div>
                <div className="col-auto">
                  <button onClick={reload} style={{ all: "unset" }}>
                    {" "}
                    <TbReload size={25} color="#ed1e24" />{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="player col">
            {audio === "" ? (
              <div className="row justify-content-center mt-3">
                <div className="col-auto mt-2">
                  <p>Versionen</p>
                </div>
                <div className="col-auto text-center">
                  {datei?.audios === undefined || null ? (
                    <div>no hay cantos </div>
                  ) : (
                    datei?.audios?.map((data, index) => (
                      <button
                        className="ms-3 selection"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                          setAudio(data)
                        }
                      >
                        v{index + 1}
                      </button>
                    ))
                  )}{" "}
                </div>{" "}
              </div>
            ) : (
              <div className="col ">
                <div className="text-center mb-1">
                  <button
                    style={{ all: "unset" }}
                    disabled={!isReady}
                    onClick={togglePlayPause}
                  >
                    {!isReady && data ? (
                      <FaSpinner size={40} />
                    ) : !isPlaying ? (
                      <FaCirclePlay color="#ed1e24" size={40} />
                    ) : (
                      <FaCirclePause color="#ed1e24" size={40} />
                    )}
                  </button>
                </div>

                <div className="col row d-flex justify-content-center">
                  <div className="col-auto timer">
                    <span>{elapsedDisplay}</span>
                  </div>

                  <div className="col-5">
                    <AudioProgressBar
                      className="hola"
                      duration={duration}
                      currentProgress={currrentProgress}
                      buffered={buffered}
                      onChange={(e) => {
                        if (!audioRef.current) return;
                        audioRef.current.currentTime =
                          e.currentTarget.valueAsNumber;
                        setCurrrentProgress(e.currentTarget.valueAsNumber);
                      }}
                    />
                  </div>
                  <div className="timer col-auto">
                    <span>{durationDisplay}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bearbeitung col-auto d-flex justify-content-center align-items-center">
            { level === "admin" ?
            <button className=" selection" onClick={() => setOpenModal(true)}>
            <div className="d-flex justify-content-center align-items-center">
              <MdEdit />
              </div>
            </button> : <div/>
}
            <button
              className=" selection ms-4"
              onClick={() => setOpenModalKommentare(true)}
            >
              <div className="d-flex justify-content-center align-items-center">
              <BiSolidCommentDetail />
              </div>
            </button>
          </div>

          <audio
            onTimeUpdate={(e) => {
              setCurrrentProgress(e.currentTarget.currentTime);
              handleBufferProgress(e);
            }}
            onProgress={handleBufferProgress}
            ref={audioRef}
            onDurationChange={(e) => setDuration(e.currentTarget.duration)}
            onCanPlay={() => setIsReady(true)}
            onPlaying={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            src={audio}
          ></audio>
        </div>
      </div>
    </div>
  );
};

export default LiedView;