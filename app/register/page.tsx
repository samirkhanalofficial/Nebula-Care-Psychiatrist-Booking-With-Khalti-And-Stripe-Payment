"use client";
import { userType } from "@/backends/types/user.type";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export default function Register() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [loading, setloading] = useState(false);
  const router = useRouter();
  async function register(event: any) {
    event.preventDefault();
    try {
      setloading(true);
      var user = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({
          fullName,
          email,
          password,
          age,
          confirmPassword,
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
        router.push("/login");
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
                      Register a New Account
                    </h2>
                  </div>
                  <form
                    className="mt-8 space-y-6"
                    onSubmit={register}
                    method="POST"
                  >
                    <div className="-space-y-px rounded-md shadow-sm">
                      <div>
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
