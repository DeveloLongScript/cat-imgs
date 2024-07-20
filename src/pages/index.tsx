import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getPlaiceholder } from "plaiceholder";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ initalImage }: { initalImage: any }) {
  const [img, setImg] = useState<{ src: string; blurDataURL: string }>(
    initalImage
  );
  const getCatPicture = () => {
    fetch("/api/hello").then((b) =>
      b.json().then((j) => {
        setImg(j.imageProps);
      })
    );
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className} bg-white rounded`}
    >
      {img.src != "" && (
        <Image
          {...img}
          alt="Cool cat pic"
          placeholder="blur"
          width={600}
          height={600}
          className="rounded max-sm:mt-[200px] sm:mt-[100px]"
        />
      )}

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
              navigator.clipboard.writeText(img.src);
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

export async function getStaticProps() {
  let result = await fetch("https://api.thecatapi.com/v1/images/search");
  let json = await result.json();

  const buffer = await fetch(json[0].url).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const { base64 } = await getPlaiceholder(buffer, { size: 10 });

  return { props: { initalImage: { blurDataURL: base64, src: json[0].url } } };
}
