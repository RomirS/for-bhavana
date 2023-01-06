import React, { useEffect, useState } from "react";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { useParams, useNavigate } from "react-router-dom";

import { storage } from "../db/config";
import ArrowLeftCircle from "../components/ArrowLeftCircle";
import ArrowRightCircle from "../components/ArrowRightCircle";
import Circle from "../components/Circle";
import LeftArrow from "../components/LeftArrow";
import RightArrow from "../components/RightArrow";
import text from "../data/text";

const PRIMARY_COLOR = "black";
const SECONDARY_COLOR = "grey";

function Slide() {
  const { s } = useParams();
  const [images, setImages] = useState({});
  const [imageNo, setImageNo] = useState(1);
  const navigate = useNavigate();

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

  return (
    <div className="flex m-auto w-5/6 sm:w-4/5 mt-10 sm:mt-32">
      <div className="flex flex-col">
        <div className="mb-8">
          {slideNo > 0 && (
            <ArrowLeftCircle onClick={decrementSlideNo} stroke={PRIMARY_COLOR} />
          )}
          <h1 className={`${slideNo > 0 ? "mx-10" : "mr-10"} inline`}>
            {slideNo === 0 ? "The Beginning" : `Month ${s}`}
          </h1>
          {slideNo < 6 && (
            <ArrowRightCircle onClick={incrementSlideNo} stroke={PRIMARY_COLOR} />
          )}
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="mb-8 flex flex-col sm:w-2/5 items-center">
            {imageLen > 0 && (
              <>
                {Object.keys(images).map((key) => (
                  <img
                    className={`object-contain w-96 h-96 mb-4 ${
                      parseInt(key, 10) === imageNo ? "" : "hidden"
                    }`}
                    key={key}
                    src={images[key]}
                    alt="Loading..."
                  />
                ))}
                <div className="flex">
                  <LeftArrow onClick={decrementImageNo} stroke={PRIMARY_COLOR} />
                  {[...Array(imageLen)].map((_, i) => (
                    <Circle
                      key={i}
                      fill={i + 1 === imageNo ? SECONDARY_COLOR : "none"}
                      onClick={() => setImageNo(i + 1)}
                      stroke={PRIMARY_COLOR}
                    />
                  ))}
                  <RightArrow onClick={incrementImageNo} stroke={PRIMARY_COLOR} />
                </div>
              </>
            )}
          </div>
          <div className="sm:ml-10 sm:w-3/5">
            {paragraphs.map((paragraph, i) => (
              <div key={i}>
                <p>{paragraph}</p>
                <br />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slide;
