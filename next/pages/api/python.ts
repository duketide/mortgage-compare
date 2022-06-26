// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Blob } from "buffer";
import { promisify } from "util";
import stream from "stream"
import type { NextApiRequest, NextApiResponse } from "next";
import { ReadableStream } from "stream/web";

type Data = Blob;
const pipeline = promisify(stream.pipeline)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.body);
  const pythonRes = await fetch(process.env.PYTHON_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      returnType: "blob",
    },
    body: JSON.stringify(req.body),
  });
  if (!pythonRes.ok) throw new Error(`unexpected response ${pythonRes.statusText}`);

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=mortgages.xlsx');
  // const data = await pythonRes.blob();
  // console.log(data)
  // const blob = new Blob([data], {
  //   type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  // });
  // console.log(blob);
  // res.status(200).send(blob);
  await pipeline(pythonRes.body as ReadableStream, res)
}
