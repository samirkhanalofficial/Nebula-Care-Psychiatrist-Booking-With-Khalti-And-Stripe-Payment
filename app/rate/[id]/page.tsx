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
export default function Rate({ params, searchParams }: any) {
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
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [ratings, setRatings] = useState<
    { _id: string; doctor: string; rating: number; message: string }[]
  >([]);
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
  async function addRating() {
    try {
      setFormLoading(true);
      var res = await fetch("/api/ratings", {
        method: "POST",
        body: JSON.stringify({
          rating,
          message: review,
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
        router.push("/profile");
        toast.success("Rating added successfully.");
      }
    } catch (e: any) {
      toast.error(e);
    } finally {
      setFormLoading(false);
    }
  }
  async function getRatings() {
    const testId = await params.id;
    var res = await fetch("/api/ratings/?id" + testId);
    if (res.status != 200) {
      toast.error("Error getting Ratings");
      setloading(false);
    } else {
      const data = await res.json();
      setRatings(data);
    }
  }

  useEffect(() => {
    getUser();
    getRatings();
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
          addRating();
        }}
      >
        <>
          <div className="mx-auto max-w-7xl sm:py-8 px-4 lg:px-8 ">
            <div className="flex justify-between items-center">
              <h3 className="text-midnightblue text-4xl lg:text-55xl font-semibold mb-5 sm:mb-0">
                Give Rating.
              </h3>
            </div>
          </div>
          {loading ? (
            <Loading />
          ) : !name && !appointmentDone ? (
            <center>
              <b> No Psychiatrist Found</b>
            </center>
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
                <div className="w-full">
                  <div className={"font-bold"}>Rating</div>
                  <div>
                    <Select
                      defaultValue={{
                        value: 1,
                        label: "1",
                      }}
                      options={[1, 2, 3, 4, 5].map((item, index) => ({
                        value: item,
                        label: `${item}`,
                      }))}
                      placeholder={"Select a Value"}
                      onChange={(value) => value && setRating(value?.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="review" className="sr-only">
                      Review
                    </label>
                    <textarea
                      id="review"
                      name="review"
                      onChange={(e) => setReview(e.target.value)}
                      autoComplete="review"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Review"
                    />
                  </div>
                </div>

                <br />
                <button
                  disabled={formLoading}
                  className={
                    "roundex-md disabled:bg-gray-400 bg-purple-600 hover:bg-purple-900 active:bg-purple-300 text-white w-full p-2"
                  }
                >
                  {formLoading && "Loading..."}
                  {!formLoading && "Rate"}
                </button>
                <br />

                <small>
                  If you give multiple rating to same doctor, previous ratings
                  of your&apos;s will be removed.
                </small>
              </div>
            </div>
          )}
        </>
      </form>
    </>
  );
}
