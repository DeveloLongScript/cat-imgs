import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [catPic, setCatPic] = useState("");
  const [w, sW] = useState(0);
  const [h, sH] = useState(0);
  const getCatPicture = () => {
    fetch("https://api.thecatapi.com/v1/images/search").then((b) =>
      b.json().then((j) => {
        setCatPic(j[0].url);
      })
    );
  };
  useEffect(getCatPicture, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className} bg-white rounded`}
    >
      <Image
        src={catPic}
        alt="Cool cat pic"
        width={600}
        height={600}
        className="rounded mt-20"
      />
      <br />
      <br />
      <div className="fixed bg-gray w-[300px]">
        <div className="backdrop-blur pb-5 pt-5 mb-5 rounded text-center">
          <strong className="text-black">Random Cat Pictures</strong>
          <br />
          <small className="text-black">
            by{" "}
            <a
              className="text-blue-800 underline"
              href="https://github.com/DeveloLongScript"
            >
              DeveloLongScript
            </a>
          </small>
          <br />
          <button
            className="bg-black w-[200px] h-[40px] rounded border-none mb-3 mt-3"
            onClick={getCatPicture}
          >
            Get new picture
          </button>
          <br />
          <button
            className="bg-black w-[200px] h-[40px] rounded border-none"
            onClick={() => {
              navigator.clipboard.writeText(catPic);
              toast.success("Copied image to clipboard!");
            }}
          >
            Copy image link
          </button>
        </div>
      </div>
    </main>
  );
}
