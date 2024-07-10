"use client";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { userType } from "@/backends/types/user.type";
import Link from "next/link";
import { VideoCameraIcon } from "@heroicons/react/24/outline";
export type appoinmentType = {
  _id: string;
  client: userType;
  doctor: userType;
  date: string;
  time: string;
  price: string;
  clientAge: number;
  doctorName: string;
  clientName: string;
  medicines: string[];
  paid: boolean;
  __v: number;
};
export default function Profile() {
  const [loading, setloading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [appoinments, setAppoinments] = useState<appoinmentType[]>([]);

  const {
    isSignedIn,
    role,
    token,
    fullName,
    age,
    email,
    image,
    price,
    nmcNumber,
    id,
  } = useAuth();

  async function getMyAppoinments() {
    if (!token) return;

    try {
      setloading(true);
      var res = await fetch(
        "/api/admin/meetings/" +
          (role == "admin" ? "" : role == "user" ? "user" : "psychiatrist"),
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token || "",
          },
        }
      );
      const data = await res.json();
      if (res.status != 200) {
        throw data.message;
      } else {
        setAppoinments(data);
        console.log(data);
      }
    } catch (e: any) {
      toast.error(e.toString());
    } finally {
      setloading(false);
    }
  }
  useEffect(() => {
    getMyAppoinments();
  }, [token]);
  if (loading) return <Loading />;
  if (!isSignedIn) return <></>;

  return (
    <main>
      <div className="md:flex md:space-x-4  p-3 justify-between items-start">
        <div className="md:w-2/5">
          <div className=" flex md:mt-20 md:ml-10 items-start space-x-3 p-3 shadow-xl border-2 border-gray-500 rounded-2xl">
            <div>
              <Image
                className="rounded-full aspect-square object-cover bg-slate-50"
                src={image == "" ? "/user.png" : image}
                alt={fullName}
                width={200}
                height={200}
              />
            </div>
            <div className="py-5">
              <b>{fullName}</b> <br />
              <b>Role:</b> {role} <br />
              <b>Age:</b> {age} <br />
              <b>Email:</b> {email} <br />
              {role == "pasychiatrist" && (
                <>
                  <b>Price:</b> Rs. {price} <br />
                </>
              )}
              {role == "pasychiatrist" && (
                <>
                  <b>NMC Number:</b> {nmcNumber} <br />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="w-full min-h-screen md:px-5">
          <br />
          <h3 className="text-midnightblue text-4xl lg:text-55xl font-semibold mb-5 sm:mb-0">
            {role != "admin" && "Your"} Bookings.
          </h3>
          <small className="">
            Another party won&apos;t be notified for the meeting joinings. So
            please join at your time even if you are allowed to stay and wait in
            video call.
          </small>
          <br />
          <br />

          <div className="w-full">
            {appoinments.slice(0, page * limit).map((appoinment) => {
              const date = appoinment.date.split("-");
              const today = new Date();
              const image = appoinment.doctor?.image;
              const image2 = appoinment.client?.image;
              let expired = false;
              if (today.getFullYear() > parseInt(date[0])) {
                expired = true;
              } else if (
                today.getFullYear() == parseInt(date[0]) &&
                today.getMonth() + 1 > parseInt(date[1])
              ) {
                expired = true;
              } else if (
                today.getFullYear() == parseInt(date[0]) &&
                today.getMonth() + 1 == parseInt(date[1]) &&
                today.getDate() > parseInt(date[2])
              ) {
                expired = true;
              }

              return (
                <div
                  key={appoinment._id}
                  className="md:flex my-3 gap-x-2 justify-between items-center p-3 shadow-md border-2 border-gray-50 rounded-3xl"
                >
                  <div className="flex  gap-x-2  items-center">
                    <div className="relative w-44 aspect-video ">
                      <Image
                        className="rounded-full aspect-square object-cover bg-slate-50 "
                        src={!image2 || image2 == "" ? "/user.png" : image2}
                        alt={appoinment.clientName}
                        width={50}
                        height={50}
                      />

                      <Image
                        className="rounded-full aspect-square object-cover bg-slate-50 absolute left-8 top-0 border-l-2 border-white "
                        src={!image || image == "" ? "/user.png" : image}
                        alt={appoinment.doctorName}
                        width={50}
                        height={50}
                      />
                    </div>
                    <div>
                      {role == "user" ? (
                        "You "
                      ) : (
                        <b className="text-gray-600">{appoinment.clientName}</b>
                      )}{" "}
                      booked an appoinment with{" "}
                      {role == "psychiatrists" ? (
                        "You "
                      ) : (
                        <b className="text-gray-600">{appoinment.doctorName}</b>
                      )}
                      for Rs. {appoinment.price}
                      <br />
                      <small>#{appoinment._id}</small> <br />
                      <small>
                        <code>
                          <b>
                            Starts at: {appoinment.date} ({appoinment.time} ||
                            Duration 25 Min)
                          </b>
                          <br />
                          {appoinment.paid ? "PAID" : "UNPAID"} |{" "}
                          {expired ? "EXPIRED" : "AVAILABLE"}
                        </code>
                      </small>
                    </div>
                  </div>

                  <div className="flex justify-center items-center py-4">
                    {role != "admin" && (
                      <span
                        className={`py-2 px-5 rounded-3xl ${
                          appoinment.paid && !expired
                            ? "bg-green-500 text-white cursor-pointer hover:bg-green-700 transition-all duration-150"
                            : appoinment.paid && expired
                            ? "bg-yellow-500 text-white"
                            : "bg-red text-white cursor-not-allowed"
                        }`}
                      >
                        <small>
                          {appoinment.paid && !expired ? (
                            <button
                              // href={"/videocall/" + appoinment._id}
                              // onClick="window.open(document.URL, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');"
                              onClick={() =>
                                window.open(
                                  "/videocall/" + appoinment._id,
                                  "_blank"
                                )
                              }
                              className="w-auto inline-block"
                            >
                              <div className="flex items-center">
                                <VideoCameraIcon width={15} />
                                &nbsp; JOIN APPOINMENT
                              </div>
                            </button>
                          ) : (
                            <>
                              {appoinment.paid && expired && role == "user" && (
                                <Link href={"/rate/" + appoinment.doctor?._id}>
                                  RATE
                                </Link>
                              )}
                              {appoinment.paid &&
                                expired &&
                                role != "user" &&
                                "completed"}
                              {expired &&
                                !appoinment.paid &&
                                "UNPAID AND EXPIRED"}
                              {!expired && !appoinment.paid && "UNPAID"}
                            </>
                          )}
                        </small>
                      </span>
                    )}

                    {role == "admin" && (
                      <span
                        className={`py-2 px-5 rounded-3xl ${
                          appoinment.paid && !expired
                            ? "bg-green-500 text-white  transition-all duration-150"
                            : "bg-red text-white cursor-not-allowed"
                        }`}
                      >
                        <small>
                          {appoinment.paid && !expired ? (
                            <button
                              // href={"/videocall/" + appoinment._id}
                              // onClick="window.open(document.URL, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');"

                              className="w-auto inline-block"
                            >
                              <div className="flex items-center">
                                Paid & Allowed
                              </div>
                            </button>
                          ) : (
                            <small>
                              {(appoinment.paid ? "PAID" : "UNPAID") +
                                (expired ? " AND EXPIRED" : "")}
                            </small>
                          )}
                        </small>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <br />

          <center>
            {page * limit < appoinments.length && (
              <button
                onClick={() => setPage(page + 1)}
                className="rounded-2xl bg-blue-600 hover:bg-blue-800 active:bg-blue-300 text-white transition-all duration-200 px-8 py-4 "
              >
                {" "}
                View More
              </button>
            )}
          </center>
        </div>
      </div>
    </main>
  );
}
