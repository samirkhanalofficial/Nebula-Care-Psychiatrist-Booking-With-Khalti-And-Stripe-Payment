import Banner from "./components/Banner/index";
import Companies from "./components/Companies/Companies";
import Mentor from "./components/Mentor/index";
import Testimonials from "./components/Testimonials/index";
import Newsletter from "./components/Newsletter/Newsletter";
import PopularPsychiatrists from "./components/PopularPsychiatrists";

export default function Home() {
  return (
    <main>
      <Banner />
      {/* <Companies /> */}
      <PopularPsychiatrists />
      <Mentor />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
