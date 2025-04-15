"use client";

import React, { useEffect, useRef, useState } from "react";
import Dropzone from "./Dropzone";
import Styles from "./Styles";
import { Loader } from "lucide-react";
import { removeBackground } from "@imgly/background-removal";

const ThumbnailCreator = () => {
  const [selectedStyle, setSelectedStyle] = useState("style1");
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(
    null
  );
  const [canvasReady, setCanvasReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [text, setText] = useState("POV");

  const setSelectedImage = async (file?: File) => {
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const src = e.target?.result as string;
        setImageSrc(src);

        const blob = await removeBackground(src);
        const processedUrl = URL.createObjectURL(blob);
        setProcessedImageUrl(processedUrl);
        setCanvasReady(true);
        setLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (canvasReady) {
      drawCompositeImage();
    }
  }, [canvasReady]);

  const drawCompositeImage = () => {
    if (!canvasRef.current || !canvasReady || !imageSrc || !processedImageUrl)
      return;

    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bgImg = new Image();

    bgImg.onload = () => {
      canvas.width = bgImg.width;
      canvas.height = bgImg.height;

      ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
      ctx.save();

      //calculate font size to fill image 90% of the canvas
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";

      let fontSize = 100;
      let selectedFont = "Arial";
      ctx.font = `${"bold"} ${fontSize}px ${selectedFont}`;
      const textWidth = ctx.measureText(text).width;
      const targetWidht = canvas.width * 0.9;

      fontSize *= targetWidht / textWidth;
      ctx.font = `${"bold"} ${fontSize}px ${selectedFont}`;

      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.globalAlpha = 1;

      const x = canvas.width / 2;
      const y = canvas.width / 2;

      ctx.translate(x, y);
      ctx.fillText(text, 0, 0);
      ctx.restore();

      const fgImg = new Image();
      fgImg.onload = () => {
        ctx.drawImage(fgImg, 0, 0, canvas.width, canvas.height);
      };

      fgImg.src = processedImageUrl;
    };

    bgImg.src = imageSrc;
  };

  return (
    <>
      {imageSrc ? (
        <>
          {loading ? (
            <div className="h-96 flex items-center justify-center">
              <Loader
                className="text-white animate-spin transition-all"
                size={30}
              />
            </div>
          ) : (
            <canvas
              ref={canvasRef}
              className="max-h-lg h-auto w-full max-w-lg rounded-md"
            ></canvas>
          )}
        </>
      ) : (
        <div>
          <div>
            <p className="scroll-m-20 text-4xl font-bold tracking-tight">
              Hi there
            </p>
            <p className="scroll-m-20 text-4xl font-bold tracking-tight">
              Want to create a thumbnail?
            </p>
            <p className="leading-7 text-muted-foreground mt-2">
              Use one of the templates below
            </p>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-10 md:flex-row md:items-start">
            <Styles
              image="/styletest.png"
              selectStyle={() => setSelectedStyle("style1")}
              isSelected={selectedStyle === "style1"}
            />
            <Styles
              image="/styletest.png"
              selectStyle={() => setSelectedStyle("style2")}
              isSelected={selectedStyle === "style2"}
            />
            <Styles
              image="/styletest.png"
              selectStyle={() => setSelectedStyle("style3")}
              isSelected={selectedStyle === "style3"}
            />
          </div>
          <Dropzone setSelectedImage={setSelectedImage} />
        </div>
      )}
    </>
  );
};

export default ThumbnailCreator;
