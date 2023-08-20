"use client";
import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import styles from "./page.module.css";
import { WhatsappShareButton } from "react-share"; // Import WhatsAppShareButton and other necessary share components

const TextToImage = () => {
  const [inputText, setInputText] = useState("");
  const canvasRef = useRef(null);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;

    html2canvas(canvas).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, "text-to-image.png");
      });
    });
  };

  const handleShare1 = async () => {
    const canvas = await html2canvas(canvasRef.current);

    const canvasDataUrl = canvas.toDataURL();
    const shareUrl = window.location.href;

    try {
      const canvasBlob = await fetch(canvasDataUrl).then((res) => res.blob());
      const shareData = {
        title: "Check out this image I created!",
        text: inputText,
        url: shareUrl,
        files: [
          new File([canvasBlob], "text-to-image.png", { type: "image/png" }),
        ],
      };

      await navigator.share(shareData);
    } catch (error) {
      console.error("Share error:", error);
    }
  };

  const handleShare = async () => {
    const canvas = canvasRef.current;
    let file;
    html2canvas(canvas).then((canvas) => {
      canvas.toBlob((blob) => {
        // saveAs(blob, "text-to-image.png");
        file = [new File([blob], "hb-img.png", { type: "image/png" })];
      });
    });

    // const canvas = await html2canvas(canvasRef.current);

    // const canvasDataUrl = canvas.toDataURL();
    // const shareUrl = window.location.href;
    // console.log("oin share,", shareUrl);

    // // const blob = await response.blob();
    // const file = [
    //   new File([canvasDataUrl], "text-to-image.png", { type: "image/png" }),
    // ];
    // console.log(file);

    // try {
    //   await navigator.share({
    //     title: 'Check out this image I created!',
    //     text: inputText,
    //     url: shareUrl,
    //     files: [new File([canvasDataUrl], 'text-to-image.png', { type: 'image/png' })],
    //   });
    // } catch (error) {
    //   console.error('Share error:', error);
    // }
    setTimeout(async () => {
      if (navigator.share) {
        await navigator
          .share({
            title: "title",
            text: "your text",
            url: "url to share",
            files: [file],
          })
          .then(() => console.log("Successful share"))
          .catch((error) => console.log("Error in sharing", error));
      } else {
        console.log(`system does not support sharing files.`);
      }
    }, 1000);
  };

  return (
    <div className={styles.main}>
      <span className={styles.header}>
        <h3>WishSphere:</h3>
        <p> Exploring Joyful Wishes</p>
      </span>
      <div ref={canvasRef} className={styles.successCard}>
        {inputText}
      </div>
      <form action="get">
        <input
          type="text"
          placeholder="Enter your text"
          value={inputText}
          onChange={handleInputChange}
        />
      </form>
      <button onClick={handleDownload}>Download Image</button>
      <WhatsappShareButton
        url={window.location.href}
        title="Check out this image I created!"
        separator=": "
        onClick={handleShare}
      >
        Share on WhatsApp
      </WhatsappShareButton>
    </div>
  );
};

export default TextToImage;
