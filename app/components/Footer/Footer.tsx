import Link from "next/link";
import Image from "next/image";

interface ProductType {
  id: number;
  section: string;
  link: any[];
}

interface socialLinks {
  imgSrc: string;
  link: string;
  width: number;
}

const socialLinks: socialLinks[] = [
  {
    imgSrc: "/assets/footer/facebook.svg",
    link: "www.facebook.com",
    width: 10,
  },
  {
    imgSrc: "/assets/footer/insta.svg",
    link: "www.instagram.com",
    width: 14,
  },
  {
    imgSrc: "/assets/footer/twitter.svg",
    link: "www.twitter.com",
    width: 14,
  },
];

const products: ProductType[] = [
  {
    id: 1,
    section: "Psychiatrist",
    link: [
      { href: "/psychiatrists", title: "All Psychiatrists" },
      { href: "/login", title: "Login" },
      { href: "/register", title: "Join Our Team" },
    ],
  },

  {
    id: 3,
    section: "User",
    link: [
      { href: "/profile", title: "Appoinment History" },

      { href: "/login", title: "Login" },
      { href: "/register", title: "Join Our Team" },
    ],
  },
  {
    id: 2,
    section: "Admin",
    link: [
      { href: "/profile", title: "Profile" },

      { href: "/login", title: "Login" },
      { href: "/admin/dashboard", title: "Admins Management" },
    ],
  },
];

const footer = () => {
  return (
    <div className="mx-auto max-w-2xl sm:pt-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="my-12 grid grid-cols-1 gap-y-10 sm:grid-cols-6 lg:grid-cols-12">
        {/* COLUMN-1 */}

        <div className="sm:col-span-6 lg:col-span-5">
          <div className="flex flex-shrink-0 items-center border-right">
            <Image
              src="/assets/logo/logo.svg"
              alt="logo"
              width={214}
              height={66}
            />
          </div>
          <h3 className="text-xs font-medium text-gunmetalgray lh-160 mt-5 mb-4 lg:mb-16">
            {" "}
            #1 Counseling Service of Nepal
          </h3>
          <div className="flex gap-4">
            {socialLinks.map((items, i) => (
              <Link href={items.link} key={i}>
                <div className="bg-white h-12 w-12 shadow-xl text-base rounded-full flex items-center justify-center footer-icons hover:bg-ultramarine">
                  <Image
                    src={items.imgSrc}
                    alt={items.imgSrc}
                    width={items.width}
                    height={2}
                    className="sepiaa"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CLOUMN-2/3/4 */}

        {products.map((product) => (
          <div key={product.id} className="sm:col-span-2">
            <p className="text-black text-lg font-medium mb-9">
              {product.section}
            </p>
            <ul>
              {product.link.map((link, index: number) => (
                <li key={index} className="mb-5">
                  <Link
                    href={link.href}
                    className="text-darkgray text-base font-normal mb-6 space-links"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* All Rights Reserved */}

      <div className="py-10 md:flex items-center justify-between border-t border-t-gray-blue">
        <h4 className="text-dark-red opacity-75 text-sm text-center md:text-start font-normal">
          @{new Date().getFullYear()}.NebulaCare.All rights reserved
          <br />
          Developed By <Link href={"https://aideascent.com"}>Aide Ascent</Link>
        </h4>
        <div className="flex gap-5 mt-5 md:mt-0 justify-center md:justify-start">
          <h4 className="text-dark-red opacity-75 text-sm font-normal">
            <Link href="#" target="_blank">
              Privacy policy
            </Link>
          </h4>
          <div className="h-5 bg-dark-red opacity-25 w-0.5"></div>
          <h4 className="text-dark-red opacity-75 text-sm font-normal">
            <Link href="#" target="_blank">
              Terms & conditions
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default footer;
