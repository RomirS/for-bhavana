import React, { useEffect, useState } from "react";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { useParams, useNavigate } from "react-router-dom";
import { withCookies } from "react-cookie";

import { storage } from "../db/config";
import Circle from "../icons/Circle";
import ChevronLeft from "../icons/ChevronLeft";
import ChevronRight from "../icons/ChevronRight";
import Navbar from "../components/Navbar";
import text from "../data/text";
import fakeText from "../data/fakeText";

const PRIMARY_COLOR = "white";
const SECONDARY_COLOR = "lightgrey";

function Slide({ isLoggedIn, setLoginCookie }) {
  const { s } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState({});
  const [imageNo, setImageNo] = useState(1);
  // eslint-disable-next-line no-undef
  const [audio, setAudio] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  const slideNo = parseInt(s, 10) || 0;
  const imageLen = Object.keys(images).length;
  const paragraphs = text[slideNo];

  useEffect(() => {
    setImages([]);
    setImageNo(1);

    listAll(ref(storage, `images/${slideNo}`)).then(async (res) => {
      res.items.forEach((imageRef) => {
        getDownloadURL(imageRef).then((url) => {
          // eslint-disable-next-line prettier/prettier
          let filename = url.match("%2..*%2F(.*?)\?alt");
          filename = filename["1"] || "";
          // eslint-disable-next-line prettier/prettier
          const [,name] = filename.match("(.+?)(\.[^.]*$|$)");
          const idx = parseInt(name.substring(1), 10);
          setImages((prevImages) => ({
            ...prevImages,
            [idx]: url,
          }));
        });
      });
    });

    const audioRef = ref(storage, `audio/${slideNo}.mp3`);
    getDownloadURL(audioRef)
      .then((url) => {
        // eslint-disable-next-line no-undef
        setAudio(new Audio(url));
      })
      .catch(() => {
        getDownloadURL(ref(storage, `audio/0.mp3`)).then((url) => {
          // eslint-disable-next-line no-undef
          setAudio(new Audio(url));
        });
      });
  }, [slideNo]);

  const incrementSlideNo = () => {
    const idx = slideNo + 1 > 6 ? 6 : slideNo + 1;
    navigate(`/slides/${idx}`);
  };

  const decrementSlideNo = () => {
    const idx = slideNo - 1 < 0 ? 0 : slideNo - 1;
    navigate(`/slides/${idx}`);
  };

  const incrementImageNo = () => {
    const idx = imageNo + 1 > imageLen ? 1 : imageNo + 1;
    setImageNo(idx);
  };

  const decrementImageNo = () => {
    const idx = imageNo - 1 < 1 ? imageLen : imageNo - 1;
    setImageNo(idx);
  };

  const playPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="w-full h-screen fixed z-0">
        {Object.keys(images).map((key) => (
          <img
            className={`object-cover w-full h-screen blur-2xl ${
              parseInt(key, 10) === imageNo ? "" : "hidden"
            }`}
            key={key}
            src={images[key]}
            alt="Loading..."
          />
        ))}
      </div>
      <Navbar setImageNo={setImageNo} setLoginCookie={setLoginCookie} />
      <div className="flex flex-col sm:flex-row z-10">
        <div className="w-full sm:w-1/2 h-screen hidden sm:block" />
        <div className="flex flex-col w-full sm:w-1/2 h-screen justify-center sm:fixed">
          <div className="mx-auto mb-4">
            {slideNo > 0 && (
              <ChevronLeft
                fill={PRIMARY_COLOR}
                onClick={decrementSlideNo}
                stroke={PRIMARY_COLOR}
                y={4}
              />
            )}
            <h1
              className={`${
                slideNo > 0 ? "mx-5 sm:mx-8" : "mr-5 sm:mr-8"
              } inline text-xl text-white`}
            >
              {slideNo === 0 ? "The Beginning" : `Month ${s}`}
            </h1>
            {slideNo < 6 && (
              <ChevronRight
                fill={PRIMARY_COLOR}
                onClick={incrementSlideNo}
                stroke={PRIMARY_COLOR}
                y={4}
              />
            )}
          </div>
          <div className="mb-4 flex flex-col items-center">
            {imageLen > 0 && !!audio && (
              <>
                {Object.keys(images).map((key) => (
                  <button type="button" onClick={playPause}>
                    <img
                      className={`object-contain w-full sm:w-96 h-96 mb-2 ${
                        parseInt(key, 10) === imageNo ? "" : "hidden"
                      }`}
                      key={key}
                      src={images[key]}
                      alt="Loading..."
                    />
                  </button>
                ))}
                <div className="flex">
                  <ChevronLeft
                    fill="none"
                    onClick={decrementImageNo}
                    stroke={PRIMARY_COLOR}
                    y={0}
                  />
                  {[...Array(imageLen)].map((_, i) => (
                    <Circle
                      key={i}
                      fill={i + 1 === imageNo ? PRIMARY_COLOR : SECONDARY_COLOR}
                      onClick={() => setImageNo(i + 1)}
                      stroke={i + 1 === imageNo ? PRIMARY_COLOR : SECONDARY_COLOR}
                    />
                  ))}
                  <ChevronRight
                    fill="none"
                    onClick={incrementImageNo}
                    stroke={PRIMARY_COLOR}
                    y={0}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full sm:w-1/2 min-h-screen sm:h-auto px-8 pt-20 sm:pr-8 lg:pr-32 text-md xl:text-lg bg-white/50">
          {paragraphs.map((paragraph, i) => (
            <div key={i}>
              <p className="text-black">
                {isLoggedIn === "true" ? paragraph : fakeText}
              </p>
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default withCookies(Slide);
