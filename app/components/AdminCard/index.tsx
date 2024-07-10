import Link from "next/link";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
export function AdminCard({
  items,
  showBest = true,
}: {
  showBest?: boolean;
  items: {
    age: number;
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
    <div className="bg-white m-3 px-3 pt-3 pb-12 my-20 shadow-courses  rounded-2xl ">
      <div className="relative rounded-3xl   overflow-hidden  h-72">
        <Image
          src={"/user.png"}
          alt={items.fullName}
          width={389}
          height={262}
          style={{
            objectFit: "cover",
          }}
          className="m-auto  overflow-hidden"
        />
      </div>

      <div className="px-3">
        <h4 className="text-2xl font-bold pt-6 text-black">{items.fullName}</h4>

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
  );
}
