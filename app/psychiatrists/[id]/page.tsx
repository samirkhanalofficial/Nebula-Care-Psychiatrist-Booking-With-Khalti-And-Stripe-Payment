"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/app/components/Loading";
import DatePicker from "react-datepicker";

import Image from "next/image";
import Select from "react-select";
import useAuth from "@/hooks/useAuth";
export type userType = {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  date: string;
};
export default function Register({ params, searchParams }: any) {
  const success = searchParams.success ?? "";
  const { isSignedIn, token } = useAuth();
  const [loading, setloading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const imageReg =
    "https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg?auto=compress&cs=tinysrgb&w=600";

  const [date, setDate] = useState(new Date());
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [nmcNumber, setNmcNumber] = useState("");
  const [image, setImage] = useState(imageReg);
  const [appointmentDone, setappoinmentDone] = useState(false);
  const [time, setTime] = useState("");
  const router = useRouter();
  const today = new Date();
  async function getUser() {
    const testId = await params.id;
    var res = await fetch("/api/psychiatrists/" + testId);
    if (res.status != 200) {
      toast.error("Error Fetching Data");
      setloading(false);
    } else {
      const data = await res.json();
      setImage(data.image);
      setPrice(data.price);
      setNmcNumber(data.nmcNumber);
      setName(data.fullName);
      setloading(false);
    }
  }
  async function addMeeting() {
    try {
      setFormLoading(true);
      var res = await fetch("/api/admin/meetings/create", {
        method: "POST",
        body: JSON.stringify({
          date: date.toISOString().split("T")[0],
          time: time,
          doctor: params.id,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const data = await res.json();
      if (res.status != 200) {
        throw data.message;
      } else {
        window.location = data.payment_url;
      }
    } catch (e: any) {
      toast.error(e);
    } finally {
      setFormLoading(false);
    }
  }

  useEffect(() => {
    getUser();
  }, []);
  if (!isSignedIn)
    return (
      <center>
        <br />
        <h2 className="text-2xl">Login Required</h2>
        <br />
        <br />
        Please login first
      </center>
    );
  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          addMeeting();
        }}
      >
        <>
          <div className="mx-auto max-w-7xl sm:py-8 px-4 lg:px-8 ">
            <div className="flex justify-between items-center">
              <h3 className="text-midnightblue text-4xl lg:text-55xl font-semibold mb-5 sm:mb-0">
                Booking Details.
              </h3>
            </div>
          </div>
          {loading ? (
            <Loading />
          ) : !name && !appointmentDone ? (
            <center>
              <b> No Psychiatrist Found</b>
            </center>
          ) : success != "" ? (
            <div className="mx-auto w-2/3  flex flex-col md:flex-row gap-20 items-center">
              <div>
                <Image
                  className="rounded-full"
                  src={success == "true" ? "/success.webp" : "/fail.png"}
                  width={300}
                  height={300}
                  alt="status"
                />
              </div>
              <div>
                <div className={"text-3xl"}>
                  <h1
                    style={{
                      color: success == "true" ? "" : "red",
                    }}
                  >
                    Payment {success == "true" ? "Success" : "Failed"}
                  </h1>
                </div>
                <div>
                  <b>Reference ID : {searchParams.meetingid ?? ""}</b>
                </div>
                Please take a screenshot of this id, this will help you to claim
                your money back in case of payment errors.
                <br />
                <br />
                <Link
                  href="/profile"
                  className="bg-blue-600 active:bg-blue-400 hover:bg-blue-800 text-white p-3 rounded-md"
                >
                  View Bookings
                </Link>
              </div>
            </div>
          ) : (
            <div className="md:flex gap-10 mx-auto max-w-7xl sm:py-8 px-4 lg:px-8 bg-white m-3  pt-3 pb-12 my-20 shadow-2xl  rounded-3xl ">
              <div className="flex flex-col md:flex-row w-full gap-10 items-center justify-center">
                <Image
                  className="rounded-2xl shadow-gray-500 shadow-2xl -mt-20 md:mt-0"
                  src={image}
                  alt={name}
                  width={300}
                  height={300}
                />

                <div>
                  <h2 className="text-2xl">{name}</h2> <br />
                  <i>{nmcNumber == "" ? "xxxxxx" : nmcNumber}</i>
                  <br />
                  <i>
                    Rs. <span className="text-2xl">{price}</span>{" "}
                  </i>
                </div>
              </div>
              <div className="md:w-2/3">
                <div className={"font-bold"}>Date</div>
                <div className="w-full">
                  <DatePicker
                    inline
                    className="bg-slate-50 w-full block  p-4 rounded-md "
                    minDate={new Date()}
                    showIcon={true}
                    selected={date}
                    onChange={(newdate) => newdate && setDate(newdate)}
                  />
                </div>
                <div className={"font-bold"}>Time</div>
                <div>
                  <Select
                    options={[
                      10, 10, 11, 11, 12, 12, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6,
                      6, 7, 7, 8, 8, 9, 9, 10, 10,
                    ].map((item, index) => ({
                      value: `${item}:${index % 2 == 0 ? "00" : "30"} ${
                        index < 2 ? "AM" : "PM"
                      }`,
                      label: `${item}:${index % 2 == 0 ? "00" : "30"} ${
                        index < 2 ? "AM" : "PM"
                      }`,
                    }))}
                    placeholder={"Select a Time"}
                    onChange={(value) => value && setTime(value?.value)}
                  />
                </div>
                <br />
                <button
                  disabled={formLoading}
                  className={
                    "roundex-md disabled:bg-gray-400 bg-purple-600 hover:bg-purple-900 active:bg-purple-300 text-white w-full p-2"
                  }
                >
                  {formLoading && "Loading..."}
                  {!formLoading && "Pay With Khalti"}
                </button>
              </div>
            </div>
          )}
        </>
      </form>
    </>
  );
}
