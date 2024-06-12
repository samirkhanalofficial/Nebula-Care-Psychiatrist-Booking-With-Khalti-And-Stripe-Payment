"use client";
import Slider from "react-slick";
import React, { Component } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

// CAROUSEL DATA

interface DataType {
  profession: string;
  comment: string;
  imgSrc: string;
  name: string;
}

const postData: DataType[] = [
  {
    name: "Robert Fox",
    profession: "CEO, Parkview Int.Ltd",
    comment:
      "This platform truly revolutionized how I approach my mental health. The ease of booking appointments with top-notch psychiatrists and the option to anonymously share my thoughts have been life-changing. Highly recommended!",
    imgSrc: "/assets/testimonial/user.svg",
  },
  {
    name: "Leslie Alexander",
    profession: "CEO, Parkview Int.Ltd",
    comment:
      "I can't express how grateful I am for stumbling upon this website. It's like having a trusted friend in the palm of your hand, guiding you towards the right psychiatrist for your needs. The anonymous thought sharing feature is a game-changer, allowing me to express myself freely without any judgment.",
    imgSrc: "/assets/mentor/user2.png",
  },
  {
    name: "Cody Fisher",
    profession: "CEO, Parkview Int.Ltd",
    comment:
      "Booking appointments with psychiatrists has never been easier thanks to this website. The interface is user-friendly, and I appreciate the wide range of professionals available. The ability to share my thoughts anonymously has been incredibly therapeutic, knowing that I'm not alone in my struggles.",
    imgSrc: "/assets/mentor/user3.png",
  },
  {
    name: "Robert Fox",
    profession: "CEO, Parkview Int.Ltd",
    comment:
      "As someone who has always been hesitant to seek help for my mental health, this platform has been a godsend. The process of finding a psychiatrist was seamless, and being able to share my thoughts anonymously has helped me open up in ways I never thought possible. I wholeheartedly recommend this website to anyone in need of support.",
    imgSrc: "/assets/mentor/user1.png",
  },
  {
    name: "Leslie Alexander",
    profession: "CEO, Parkview Int.Ltd",
    comment:
      "I've tried various platforms for booking appointments with psychiatrists, but none compare to this one. The interface is intuitive, and the option to share my thoughts anonymously has been a game-changer. It's comforting to know that I can seek help without fear of judgment. Thank you for providing such a valuable service!",
    imgSrc: "/assets/mentor/user2.png",
  },
  {
    name: "Cody Fisher",
    profession: "CEO, Parkview Int.Ltd",
    comment:
      "Absolutely phenomenal! This website has been a lifeline for me. The ability to book appointments with skilled psychiatrists at the touch of a button is invaluable. What truly sets it apart is the anonymous thought sharing feature. It's like having a safe haven to express myself without any fear. I've found immense comfort in knowing that I can be completely honest about my struggles without any judgment. Thank you for providing such a vital resource for mental health support!",
    imgSrc: "/assets/mentor/user3.png",
  },
];

// CAROUSEL SETTINGS

export default class MultipleItems extends Component {
  render() {
    const settings = {
      dots: true,
      dotsClass: "slick-dots",
      infinite: true,
      slidesToShow: 3,
      // centerMode: true,
      slidesToScroll: 2,
      arrows: false,
      autoplay: false,
      speed: 500,
      autoplaySpeed: 2000,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
          },
        },
      ],
    };

    return (
      <div className="pt-40 pb-10 sm:pb-32 lg:py-32" id="testimonial">
        <div className="mx-auto max-w-7xl sm:py-4 lg:px-8">
          <Slider {...settings}>
            {postData.map((items, i) => (
              <div key={i}>
                <div
                  className={`bg-white m-4 p-5 my-20 relative ${
                    i % 2 ? "middleDiv" : "testimonial-shadow"
                  }`}
                >
                  <div className="absolute top-[-45px]">
                    <Image
                      src={items.imgSrc}
                      alt={items.imgSrc}
                      width={100}
                      height={100}
                      className="inline-block"
                    />
                  </div>
                  <h4 className="text-base font-normal text-darkgray my-4">
                    {items.comment}
                  </h4>
                  <hr style={{ color: "#D7D5D5" }} />
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-darkbrown pt-4 pb-2">
                        {items.name}
                      </h3>
                      <h3 className="text-sm font-normal text-lightgray pb-2">
                        {items.profession}
                      </h3>
                    </div>
                    <div className="flex">
                      <StarIcon width={20} className="text-gold" />
                      <StarIcon width={20} className="text-gold" />
                      <StarIcon width={20} className="text-gold" />
                      <StarIcon width={20} className="text-gold" />
                      <StarIcon width={20} className="text-lightgray" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
}
