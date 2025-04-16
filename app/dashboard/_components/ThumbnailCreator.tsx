"use client";

import React, { useEffect, useRef, useState } from "react";
import Dropzone from "./Dropzone";
import Styles from "./Styles";
import { ArrowLeft, FileDown, Loader, Pencil } from "lucide-react";
import { removeBackground } from "@imgly/background-removal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { domine, lora, inter, geist } from "../../fonts";

const presets = {
  style1: {
    fontSize: 100,
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 1)",
    opacity: 1,
  },
  style2: {
    fontSize: 100,
    fontWeight: "bold",
    color: "rgba(0, 0, 0, 1)",
    opacity: 1,
  },
  style3: {
    fontSize: 100,
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 0.8)",
    opacity: 0.8,
  },
};

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
  const [font, setFont] = useState("arial");

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

      let preset = presets.style1;
      switch (selectedStyle) {
        case "style2":
          preset = presets.style2;
          break;
        case "style3":
          preset = presets.style3;
          break;
      }

      ctx.save();

      //calculate font size to fill image 90% of the canvas
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";

      let fontSize = 100;
      let selectedFont = font;
      switch (font) {
        case "inter":
          selectedFont = inter.style.fontFamily;
        case "domine":
          selectedFont = domine.style.fontFamily;
        case "lora":
          selectedFont = lora.style.fontFamily;
        case "geist":
          selectedFont = geist.style.fontFamily;
      }
      ctx.font = `${preset.fontWeight} ${fontSize}px ${selectedFont}`;
      const textWidth = ctx.measureText(text).width;
      const targetWidht = canvas.width * 0.9;

      fontSize *= targetWidht / textWidth;
      ctx.font = `${"bold"} ${fontSize}px ${selectedFont}`;

      ctx.fillStyle = preset.color;
      ctx.globalAlpha = preset.opacity;

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

  const handleDownload = async () => {
    if (canvasRef.current) {
      const link = document.createElement("a");
      link.download = "image.png";
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
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
            <div className="flex flex-col items-center justify-center">
              <div className="my-4 flex w-full flex-col items-center gap-3">
                <Button
                  variant={"link"}
                  className="rounded-full self-start group"
                  onClick={() => {
                    setImageSrc(null);
                    setProcessedImageUrl(null);
                    setCanvasReady(false);
                  }}
                >
                  <ArrowLeft className="translate-x-0.5 group-hover:-translate-x-0.5 transition-all duration-200" />
                  <span className="leading-7">Go back</span>
                </Button>
                <canvas
                  ref={canvasRef}
                  className="max-h-lg h-auto w-full max-w-lg rounded-md"
                ></canvas>
              </div>
              <Card className="w-full rounded-md">
                <CardHeader>
                  <CardTitle>Edit</CardTitle>
                  <CardContent>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="text">Text</Label>
                        <Input
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          id="text"
                          placeholder="Text in Thumbnail"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="font">Font</Label>
                        <Select
                          value={font}
                          onValueChange={(value) => setFont(value)}
                          defaultValue="arial"
                        >
                          <SelectTrigger className="w-full" id="font">
                            <SelectValue placeholder="Select Font" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="arial">Arial</SelectItem>
                            <SelectItem value="intern">Intern</SelectItem>
                            <SelectItem value="domine">Domine</SelectItem>
                            <SelectItem value="lora">Lora</SelectItem>
                            <SelectItem value="geist">Geist</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-wrap justify-between gap-2 mt-3">
                    <Button
                      className="rounded-full border w-full sm:flex-1"
                      onClick={() => handleDownload()}
                    >
                      <FileDown />
                      Download
                    </Button>
                    <Button
                      className="rounded-full border w-full sm:flex-1"
                      onClick={drawCompositeImage}
                    >
                      <Pencil />
                      Update
                    </Button>
                  </CardFooter>
                </CardHeader>
              </Card>
            </div>
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
              image="/styl1.png"
              selectStyle={() => setSelectedStyle("style1")}
              isSelected={selectedStyle === "style1"}
            />
            <Styles
              image="/styl2.png"
              selectStyle={() => setSelectedStyle("style2")}
              isSelected={selectedStyle === "style2"}
            />
            <Styles
              image="/styl3.png"
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
