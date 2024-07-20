// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getPlaiceholder } from "plaiceholder";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  fetch("https://api.thecatapi.com/v1/images/search").then((c) =>
    c
      .json()
      .then(async (b) => {
        const buffer = await fetch(b[0].url).then(async (res) =>
          Buffer.from(await res.arrayBuffer())
        );

        const { base64 } = await getPlaiceholder(buffer, { size: 10 });

        res.status(200).json({
          imageProps: {
            src: b[0].url,
            blurDataURL: base64,
          },
        });
      })
      .catch((c) => {
        res.send({ err: c });
      })
  );
}
