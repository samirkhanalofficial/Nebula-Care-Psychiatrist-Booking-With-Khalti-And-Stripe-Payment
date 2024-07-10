"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export type userType = {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  date: string;
};
export default function AddMeditation() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const router = useRouter();
  const [loading, setloading] = useState(false);
  async function addMeditation(event: any) {
    try {
      setloading(true);
      event.preventDefault();
      const token = await localStorage.getItem("token");
      var res = await fetch("/api/admin/meditation/create", {
        method: "POST",
        body: JSON.stringify({
          title,
          link,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: token || "",
        },
      });
      if (res.status != 200) {
        toast.error("Error adding Meditation");
        setloading(false);
      } else {
        setloading(false);
        toast.success("Added Meditation");
        router.push("/meditation");
      }
    } catch (e: any) {
      toast.error(e);
    } finally {
      setloading(false);
    }
  }
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
  const imageReg =
    "https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg?auto=compress&cs=tinysrgb&w=600";
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
                      Add Meditation
                    </h2>
                  </div>
                  <form
                    className="mt-8 space-y-6"
                    onSubmit={addMeditation}
                    method="POST"
                  >
                    <div className="-space-y-px rounded-md shadow-sm">
                      <div>
                        <label htmlFor="title" className="sr-only">
                          Title
                        </label>
                        <input
                          id="title"
                          name="title"
                          type="text"
                          onChange={(e) => setTitle(e.target.value)}
                          autoComplete="title"
                          required
                          className="relative block w-full appearance-none rounded-none rounded-t-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          placeholder="Title"
                        />
                      </div>
                      <div>
                        <label htmlFor="embedlink" className="sr-only">
                          Embed Link
                        </label>
                        <input
                          id="embedlink"
                          name="embedlink"
                          type="text"
                          onChange={(e) => setLink(e.target.value)}
                          autoComplete="current-password"
                          required
                          className="relative block w-full appearance-none rounded-none rounded-b-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          placeholder="Embed Link"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        disabled={loading}
                        type="submit"
                        className="group disabled:bg-gray-300 relative flex w-full justify-center rounded-md border border-transparent bg-Blueviolet py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        {loading && "Adding..."}
                        {!loading && "Add"}
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
