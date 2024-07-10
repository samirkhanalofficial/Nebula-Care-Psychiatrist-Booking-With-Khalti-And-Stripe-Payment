import Link from "next/link";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { MouseEventHandler, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export function MeditationCard({
  item,
  onClick,
  isAdmin = false,
}: {
  isAdmin?: boolean;
  onClick: MouseEventHandler;
  item: {
    title: string;
    link: string;
    __v: number;
    _id: string;
  };
}): React.JSX.Element {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className="bg-white m-3 px-3 pt-3 pb-12 my-20 shadow-courses hover:bg-slate-50 rounded-2xl cursor-pointer">
        <div onClick={onClick}>
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

            {/* {showBest && (
            <div className="absolute right-2 bottom-2 bg-ultramarine rounded-full p-6">
              <h3 className="text-white uppercase text-center text-sm font-medium">
                best <br /> seller
              </h3>
            </div>
          )} */}
          </div>

          <div className="px-3 relative">
            <h4 className="text-2xl font-bold pt-6 text-black line-clamp-2 ">
              {item.title}
            </h4>

            {/* <div>
              <h3 className="text-3xl font-medium">Rs. {items.price}</h3>
            </div> */}
          </div>
        </div>
        {isAdmin && (
          <div>
            <button
              onClick={async () => {
                const confirmdelete = confirm(
                  "Are you sure, you want to delete " + item.title + " ?"
                );
                if (!confirmdelete) return;
                const token = await localStorage.getItem("token");
                setLoading(true);
                try {
                  var res = await fetch(
                    "/api/admin/meditation/delete/" + item._id,
                    {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                        authorization: token || "",
                      },
                    }
                  );
                  if (res.status != 200) {
                    throw "error deleting meditation";
                  } else {
                    window.location.href = "/meditation";
                    toast.success("deleted meditation");
                  }
                } catch (e: any) {
                  toast.error(e.toString());
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading}
              className="w-full disabled:bg-gray-700 hover:bg-red bottom-5 py-2 rounded-xl bg-purple-600 text-white"
            >
              {!loading && "Delete"}
              {loading && "Deleting..."}
            </button>
          </div>
        )}
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
