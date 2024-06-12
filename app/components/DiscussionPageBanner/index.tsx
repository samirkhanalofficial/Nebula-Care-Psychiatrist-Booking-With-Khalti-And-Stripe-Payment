import Image from "next/image";
import { SearchBox } from "../SearchBox";
import { DiscussionMessage } from "../DiscussionMessage";

const DiscussionPageBanner = () => {
  return (
    <div id="home-section" className="bg-lightkblue">
      <div className="mx-auto max-w-7xl pt-20 sm:pb-24 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 space-x-1">
          <div className="col-span-6 flex flex-col justify-evenly">
            <div className="flex gap-2 mx-auto lg:mx-0">
              <Image
                src="/assets/banner/check.svg"
                alt="check-image"
                width={20}
                height={20}
              />
              <h3 className="text-kellygreen text-sm font-semibold text-center lg:text-start">
                Follow the Healty Guidelines
              </h3>
            </div>
            <h1 className="text-midnightblue text-4xl sm:text-5xl font-semibold text-center lg:text-start lh-120 pt-5 lg:pt-0">
              Share Your problems.
            </h1>
            <h3 className="text-charcoal text-lg font-normal text-center lg:text-start opacity-75 pt-5 lg:pt-0">
              We believe sharing your problem makes you better, so why not ? Our
              experts are there to give solution for you.
            </h3>

            <div>
              <DiscussionMessage />
            </div>

            <div className="flex items-center justify-between pt-10 lg:pt-4">
              <div className="flex gap-2">
                <Image
                  src="/assets/banner/check-circle.svg"
                  alt="check-image"
                  width={30}
                  height={30}
                  className="smallImage"
                />
                <p className="text-sm sm:text-lg font-normal text-black">
                  Anonymous Sharing
                </p>
              </div>
              <div className="flex gap-2">
                <Image
                  src="/assets/banner/check-circle.svg"
                  alt="check-image"
                  width={30}
                  height={30}
                  className="smallImage"
                />
                <p className="text-sm sm:text-lg font-normal text-black">
                  Expert&apos;s Opinions
                </p>
              </div>
              <div className="flex gap-2">
                <Image
                  src="/assets/banner/check-circle.svg"
                  alt="check-image"
                  width={30}
                  height={30}
                  className="smallImage"
                />
                <p className="text-sm sm:text-lg font-normal text-black">
                  Free of Cost
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-6 flex justify-center">
            <Image
              src="/assets/banner/mahila.png"
              alt="nothing"
              width={1000}
              height={805}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionPageBanner;
