import Image from "next/image";
import Button from "./ui/button";
import SelectWithFilter from "./selectWithFilter";

export default function Hero() {
  return (
    <section className="hero h-[620px] flex flex-col bg-red-500 mt-0">
      <div className="overlay"></div> {/* Add this overlay div */}
      <div className="main-container flex flex-col gap-8 items-center text-center pb-16 mt-auto relative z-3">
        <h3 className="header text-white">
          Unlock your future with Scholarships
        </h3>
        <h1 className="header text-white">
          Explore scholarships and financial aid options&nbsp; to empower your
          academic journey
        </h1>
        <div className="flex w-[100%] gap-4 items-center">
          {/* <input
              type="text"
              placeholder="where do you want to study"
              className="sm:w-[50%] md:w-[40%] w-[60%]"
            /> */}

          <SelectWithFilter />
          
        </div>
      </div>
    </section>
  );
}
