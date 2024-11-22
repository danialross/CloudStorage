import { BsSignDeadEnd } from "react-icons/bs";
import { FaArrowCircleLeft } from "react-icons/fa";

import Link from "next/link";

export default function Page() {
  return (
    <div
      className={
        " bg-tertiary w-screen h-screen flex flex-col justify-center items-center gap-8"
      }
    >
      <BsSignDeadEnd size={400} className={"text-white"} />
      <span className={"text-5xl font-bold text-white"}>
        Oh No! The Resource Isn't Here
      </span>
      <Link
        href={"/"}
        className={
          "text-white text-2xl bold hover:bg-white hover:text-tertiary p-4 rounded-xl"
        }
      >
        <div className={"flex justify-center items-center gap-2"}>
          <FaArrowCircleLeft />
          Go Home
        </div>
      </Link>
    </div>
  );
}
