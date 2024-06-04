"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/app/components/Loading";
import Image from "next/image";
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
  const [loading, setloading] = useState(true);
  const imageReg =
    "https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg?auto=compress&cs=tinysrgb&w=600";

  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [nmcNumber, setNmcNumber] = useState("");
  const [image, setImage] = useState(imageReg);
  const [appointmentDone, setappoinmentDone] = useState(false);
  const [time, setTime] = useState("");
  const router = useRouter();
  const today = new Date();
  async function getUser() {
    const token = await localStorage.getItem("token");
    // if (!token) {
    //   router.push("/login");
    // }
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
  async function addMeeting(event: any) {
    event.preventDefault();
    try {
      setloading(true);
      const token = await localStorage.getItem("token");
      var res = await fetch("/api/admin/meetings/create", {
        method: "POST",
        body: JSON.stringify({
          date,
          time,
          doctor: params.id,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: token || "",
        },
      });
      if (res.status != 200) {
        toast.error("Error Booking for Appoinments");
        setloading(false);
      } else {
        const data = await res.json();
        window.location = data.payment_url;
      }
    } catch (e: any) {
      toast.error(e);
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <form action="" onSubmit={async (event) => addMeeting(event)}>
        <>
          <div className="mx-auto max-w-7xl sm:py-8 px-4 lg:px-8 ">
            <div className="flex justify-between items-center">
              <h3 className="text-midnightblue text-4xl lg:text-55xl font-semibold mb-5 sm:mb-0">
                Book Appoinment.
              </h3>
            </div>
          </div>
          {loading ? (
            <Loading />
          ) : !name && !appointmentDone ? (
            <b> No Psychiatrist Found</b>
          ) : success != "" ? (
            <>
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
              <br /> <br /> <br />
              <Link href="/profile" className="mybutton">
                Done
              </Link>
            </>
          ) : (
            <div className="flex gap-10 mx-auto max-w-7xl sm:py-8 px-4 lg:px-8 bg-white m-3  pt-3 pb-12 my-20 shadow-2xl  rounded-3xl ">
              <div className="flex w-full gap-x-5 items-center">
                <Image
                  className="rounded-2xl"
                  src={image}
                  alt={name}
                  width={200}
                  height={100}
                />
                <div>
                  <b>{name}</b> <br />
                  <i>{nmcNumber == "" ? "xxxxxx" : nmcNumber}</i>
                  <br />
                  <i>
                    Rs. <span className="text-2xl">{price}</span>{" "}
                  </i>
                </div>
              </div>
              <div className="w-2/3">
                <div className={"font-bold"}>Date</div>
                <div>
                  <input
                    type="date"
                    placeholder="Date"
                    min={today.getDate()}
                    className={""}
                    onChange={(event) => setDate(event.target.value)}
                    value={date}
                  />
                </div>
                <div className={"font-bold"}>Time</div>
                <div>
                  <input
                    type="time"
                    placeholder="Choose a Time"
                    className={""}
                    onChange={(event) => setTime(event.target.value)}
                    value={time}
                  />
                </div>
                <hr />
                <br />
                <div className={"font-bold"}>Psychiatrist Name</div>
                <div>
                  <input className={""} disabled={true} value={name} />
                </div>
                <div className={"font-bold"}>Price (Rs)</div>
                <div>
                  <input className={""} disabled={true} value={price} />
                </div>

                <button className={""}>Pay With Khalti </button>
              </div>
            </div>
          )}
        </>
      </form>
    </>
  );
}
