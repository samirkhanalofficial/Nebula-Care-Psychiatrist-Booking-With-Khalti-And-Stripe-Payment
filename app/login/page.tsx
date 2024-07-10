"use client";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);

  async function login(e: FormEvent) {
    e.preventDefault();
    setloading(true);
    try {
      setloading(true);
      let result = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (result.status == 200) {
        const loginResult: {
          token: string;
          user: {
            _id: string;
            role: string;
            fullName: string;
            email: string;
            image: string;
            age: number;
            price: number;
            nmcNumber: string;
          };
        } = await result.json();
        console.log(loginResult.user);
        if (loginResult.token) {
          await localStorage.setItem("token", loginResult.token);
          await localStorage.setItem("role", loginResult.user.role);
          await localStorage.setItem("id", loginResult.user._id);
          await localStorage.setItem("fullName", loginResult.user.fullName);
          await localStorage.setItem("email", loginResult.user.email);
          await localStorage.setItem("image", loginResult.user.image);
          await localStorage.setItem("nmcNumber", loginResult.user.nmcNumber);
          await localStorage.setItem("age", loginResult.user.age.toString());
          await localStorage.setItem(
            "price",
            loginResult.user.price.toString()
          );
          toast.success("Login Success");
          window.location.href = "/";
        }
      } else {
        throw "Email or Password you entered is incorrect";
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
                      Sign in to your account
                    </h2>
                  </div>
                  <form
                    className="mt-8 space-y-6"
                    onSubmit={login}
                    method="POST"
                  >
                    <div className="-space-y-px rounded-md shadow-sm">
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
                          className="relative block w-full appearance-none rounded-none rounded-t-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                    </div>

                    <div>
                      <button
                        disabled={loading}
                        type="submit"
                        className="group disabled:bg-gray-300 relative flex w-full justify-center rounded-md border border-transparent bg-Blueviolet py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        {loading && "Signing in..."}
                        {!loading && "Sign in"}
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
