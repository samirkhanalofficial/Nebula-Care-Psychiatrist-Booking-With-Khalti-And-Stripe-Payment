import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";
import Signdialog from "./Signdialog";
import Registerdialog from "./Registerdialog";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { name: "Home", href: "/", current: true },
  { name: "Psychiatrists", href: "/psychiatrists", current: false },
  { name: "Discussion", href: "/discussion", current: false },
  { name: "Meditation", href: "/meditation", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const CustomLink = ({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Link href={href} passHref>
      <span onClick={onClick} className="px-3 py-4 text-lg font-normal">
        {children}
      </span>
    </Link>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [currentLink, setCurrentLink] = useState(pathname);

  const handleLinkClick = (href: string) => {
    setCurrentLink(href);
  };

  return (
    <Disclosure as="nav" className="navbar">
      <>
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="relative flex h-12 md:h-20 items-center justify-between">
            <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
              {/* LOGO */}

              <div className="flex flex-shrink-0 items-center">
                <img
                  className="block h-12 w-40 lg:hidden"
                  src={"/assets/logo/logo.svg"}
                  alt="dsign-logo"
                />
                <img
                  className="hidden h-full w-full lg:block"
                  src={"/assets/logo/logo.svg"}
                  alt="dsign-logo"
                />
              </div>

              {/* LINKS */}

              <div className="hidden lg:block m-auto">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <CustomLink
                      key={item.name}
                      href={item.href}
                      onClick={() => handleLinkClick(item.href)}
                    >
                      <span
                        className={classNames(
                          item.href === currentLink
                            ? "underline-links"
                            : "text-slategray",
                          "px-3 py-4 text-lg font-normal opacity-75 hover:opacity-100"
                        )}
                        aria-current={item.href ? "page" : undefined}
                      >
                        {item.name}
                      </span>
                    </CustomLink>
                  ))}
                </div>
              </div>
            </div>

            {/* SIGNIN DIALOG */}

            {!isSignedIn && (
              <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:pr-0">
                <div className="hidden lg:block">
                  <Link
                    type="button"
                    className="text-lg text-Blueviolet font-medium"
                    href={"/login"}
                  >
                    Log In
                  </Link>
                </div>
              </div>
            )}

            {/* REGISTER DIALOG */}

            {!isSignedIn && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto  sm:pr-0">
                <div className="hidden lg:block">
                  <Link
                    className="text-Blueviolet text-lg font-medium ml-9 py-5 px-16 transition duration-150 ease-in-out rounded-full bg-semiblueviolet hover:text-white hover:bg-Blueviolet"
                    href={"/register"}
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            )}
            {isSignedIn && (
              <>
                <CustomLink
                  href={"/profile"}
                  onClick={() => handleLinkClick("/profile")}
                >
                  <span
                    className={classNames(
                      "/profile" === currentLink
                        ? "underline-links"
                        : "text-slategray",
                      "px-3 py-4 text-lg font-normal opacity-75 hover:opacity-100 hidden md:block"
                    )}
                    aria-current={"/profile" ? "page" : undefined}
                  >
                    My Profile
                  </span>
                </CustomLink>
                <CustomLink
                  href={"/"}
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/";
                  }}
                >
                  <span
                    className={classNames(
                      "/logout" === currentLink
                        ? "underline-links"
                        : "text-slategray",
                      "px-3 py-4 text-lg font-normal opacity-75 hover:opacity-100 hidden md:block"
                    )}
                    aria-current={"/logout" ? "page" : undefined}
                  >
                    Logout
                  </span>
                </CustomLink>
              </>
            )}
            {/* DRAWER FOR MOBILE VIEW */}

            {/* DRAWER ICON */}

            <div className="block lg:hidden">
              <Bars3Icon
                className="block h-6 w-6"
                aria-hidden="true"
                onClick={() => setIsOpen(true)}
              />
            </div>

            {/* DRAWER LINKS DATA */}

            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
              <Drawerdata isSignedIn={isSignedIn} />
            </Drawer>
          </div>
        </div>
      </>
    </Disclosure>
  );
};

export default Navbar;
