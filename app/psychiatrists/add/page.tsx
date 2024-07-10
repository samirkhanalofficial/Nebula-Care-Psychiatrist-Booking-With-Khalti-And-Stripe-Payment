"use client";
import { userType } from "@/backends/types/user.type";
import { CameraIcon } from "@heroicons/react/24/outline";
import { alt } from "joi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Register() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [NMC, setNMC] = useState("");
  const [price, setPrice] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState<File>();
  const [age, setAge] = useState("");
  const [loading, setloading] = useState(false);
  const router = useRouter();
  async function checkAdmin() {
    const role = await localStorage.getItem("role");
    if (role != "admin") {
      router.push("/");
      toast.error("You must login as admin to access this.");
      return;
    }
  }
  useEffect(() => {
    checkAdmin();
  }, []);
  async function register(event: any) {
    event.preventDefault();
    try {
      setloading(true);
      if (!file && !file?.[0]) throw "Please select profile picture.";
      const formData = new FormData();
      formData.append("file", file!);
      formData.append("upload_preset", "my-upload");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dmybkl5mt/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.status != 200) {
        throw "Error uploading image";
      } else {
        const decod = await response.json();
        var user = await fetch("/api/psychiatrists/create", {
          method: "POST",
          body: JSON.stringify({
            fullName,
            email,
            password,
            age,
            confirmPassword,
            nmcNumber: NMC,
            amount: price,
            image: decod.url!,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (user.status != 200) {
          const userData: { message: string } = await user.json();
          throw userData.message!;
        } else {
          const userData: userType = await user.json();
          toast.success("Registered Successfully. Please login Now.");
          router.push("/psychiatrists");
        }
      }
    } catch (e: any) {
      toast.error(e.toString());
    } finally {
      setloading(false);
    }
  }

  return (
    <div>
      <div className=" inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div>
            <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                  <div>
                    <img
                      className="mx-auto h-12 w-auto"
                      src="/assets/logo/logo.svg"
                      alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                      Add Psychiatrist
                    </h2>
                  </div>
                  <form
                    className="mt-8 space-y-6"
                    onSubmit={register}
                    method="POST"
                  >
                    <div className="-space-y-px rounded-md shadow-sm">
                      <div>
                        <center>
                          <label
                            htmlFor="image"
                            className="block relative  cursor-pointer rounded-full aspect-square w-24"
                          >
                            {file && (
                              <Image
                                className="rounded-full"
                                src={URL.createObjectURL(file)}
                                alt="PP"
                                fill
                              />
                            )}
                            {
                              <div className="text-white bg-gray-800 hover:bg-gray-700  bg-opacity-30 rounded-full absolute w-full h-full flex items-center justify-center">
                                <CameraIcon width={30} />
                              </div>
                            }
                          </label>
                        </center>
                        <br />
                        <input
                          type="file"
                          name="image"
                          id="image"
                          onChange={(e) =>
                            e.target.files &&
                            e.target.files[0] &&
                            setFile(e.target.files[0])
                          }
                          className="hidden"
                        />

                        <label htmlFor="full-name" className="sr-only">
                          Full Name
                        </label>
                        <input
                          id="full-name"
                          name="fullname"
                          type="text"
                          onChange={(e) => setFullName(e.target.value)}
                          autoComplete="name"
                          required
                          className="relative block w-full appearance-none rounded-none rounded-t-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          placeholder="Full Name"
                        />
                      </div>
                      <div>
                        <label htmlFor="nmcnumber" className="sr-only">
                          NMC Number
                        </label>
                        <input
                          id="nmcnumber"
                          name="nmcnumber"
                          type="text"
                          onChange={(e) => setNMC(e.target.value)}
                          autoComplete="nmcnumber"
                          required
                          className="relative block w-full appearance-none rounded-none rounded-t-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          placeholder="NMC Number"
                        />
                      </div>
                      <div>
                        <label htmlFor="age" className="sr-only">
                          Age
                        </label>
                        <input
                          id="age"
                          name="age"
                          type="number"
                          onChange={(e) => setAge(e.target.value)}
                          autoComplete="age"
                          required
                          className="relative block w-full appearance-none rounded-none rounded-t-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          placeholder="Age"
                        />
                      </div>
                      <div>
                        <label htmlFor="Price" className="sr-only">
                          Price
                        </label>
                        <input
                          id="Price"
                          name="Price"
                          type="number"
                          onChange={(e) => setPrice(e.target.value)}
                          autoComplete="Price"
                          required
                          className="relative block w-full appearance-none rounded-none rounded-t-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          placeholder="Price in Rs."
                        />
                      </div>
                      <div>
                        <label htmlFor="email-address" className="sr-only">
                          Email address
                        </label>
                        <input
                          id="email-address"
                          name="email"
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                          autoComplete="email"
                          required
                          className="relative block w-full appearance-none rounded-none  border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          placeholder="Email address"
                        />
                      </div>

                      <div>
                        <label htmlFor="password" className="sr-only">
                          Password
                        </label>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                          autoComplete="current-password"
                          required
                          className="relative block w-full appearance-none rounded-none rounded-b-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          placeholder="Password"
                        />
                      </div>
                      <div>
                        <label htmlFor="confirmpassword" className="sr-only">
                          Confirm Password
                        </label>
                        <input
                          id="confirmpassword"
                          name="confirmpassword"
                          type="password"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          autoComplete="confirmpassword"
                          required
                          className="relative block w-full appearance-none rounded-none rounded-b-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          placeholder="Confirm Password"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        disabled={loading}
                        type="submit"
                        className="group disabled:bg-gray-300 relative flex w-full justify-center rounded-md border border-transparent bg-Blueviolet py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        {loading && "Creating Account..."}
                        {!loading && "Create Account"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}
