import Link from "next/link";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { MouseEventHandler } from "react";
export function MeditationCard({
  item,
  onClick,
  showBest = true,
}: {
  showBest?: boolean;
  onClick: MouseEventHandler;
  item: {
    title: string;
    link: string;
    __v: number;
    _id: string;
  };
}): React.JSX.Element {
  return (
    <>
      <div
        onClick={onClick}
        className="bg-white m-3 px-3 pt-3 pb-12 my-20 shadow-courses hover:bg-slate-50 rounded-2xl cursor-pointer"
      >
        <div className="relative rounded-3xl   overflow-hidden  h-72">
          <div className="absolute w-full h-full z-30 t-0 b-0 l-0 r-0 bg-transparent">
            {" "}
          </div>
          <iframe
            src={item.link + "?si=zH3qW6ebQOz6Kiym&amp;controls=0"}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen={true}
            aria-disabled
            width={389}
            height={262}
            className="m-auto  overflow-hidden"
          />

          {showBest && (
            <div className="absolute right-2 bottom-2 bg-ultramarine rounded-full p-6">
              <h3 className="text-white uppercase text-center text-sm font-medium">
                best <br /> seller
              </h3>
            </div>
          )}
        </div>

        <div className="px-3">
          <h4 className="text-2xl font-bold pt-6 text-black">{item.title}</h4>

          {/* <div>
              <h3 className="text-3xl font-medium">Rs. {items.price}</h3>
            </div> */}
        </div>

        {/* <hr style={{ color: "#C4C4C4" }} />
  
          <div className="flex justify-between pt-6">
            <div className="flex gap-4">
              <Image
                src={"/assets/courses/book-open.svg"}
                alt="users"
                width={24}
                height={24}
                className="inline-block m-auto"
              />
              <h3 className="text-base font-medium text-black opacity-75">
                {items.role} classes
              </h3>
            </div>
            <div className="flex gap-4">
              <Image
                src={"/assets/courses/users.svg"}
                alt="users"
                width={24}
                height={24}
                className="inline-block m-auto"
              />
              <h3 className="text-base font-medium text-black opacity-75">
                {items.price} students
              </h3>
            </div>
          </div> */}
      </div>
    </>
  );
}
