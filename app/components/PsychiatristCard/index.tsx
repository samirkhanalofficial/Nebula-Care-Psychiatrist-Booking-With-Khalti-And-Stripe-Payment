import Link from "next/link";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
export function PsychiatristCard({
  items,
  showBest = true,
}: {
  showBest?: boolean;
  items: {
    age: number;
    rating: number;
    email: string;
    fullName: string;
    image: string;
    price: string;
    role: string;
    nmcNumber: string;
    __v: number;
    _id: string;
  };
}): React.JSX.Element {
  return (
    <Link href={"/psychiatrists/" + items._id}>
      <div className="bg-white m-3 px-3 pt-3 pb-12 my-20 shadow-courses hover:bg-slate-50 rounded-2xl cursor-pointer">
        <div className="relative rounded-3xl   overflow-hidden  h-72">
          <Image
            src={items.image}
            alt={items.fullName}
            width={389}
            height={262}
            style={{
              objectFit: "cover",
            }}
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
          <h4 className="text-2xl font-bold pt-6 text-black">
            {items.fullName}
          </h4>

          <div>
            <h3 className="text-base font-normal pt-1 opacity-75">
              {items.nmcNumber == "" ? "xxxxxxxx" : items.nmcNumber}
            </h3>
          </div>

          <div className="flex justify-between items-center py-6">
            <div className="flex gap-1">
              <div className="flex">
                <StarIcon className="h-5 w-5 text-gold" />
              </div>
              <h3 className="text-red text-22xl font-medium">
                {items.rating.toFixed(2) ?? 0}
              </h3>
            </div>
            <div>
              <h3 className="text-3xl font-medium">Rs. {items.price}</h3>
            </div>
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
      </div>
    </Link>
  );
}
