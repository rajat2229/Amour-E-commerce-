import React from "react";
import logo from "../../../assets/logo.png";
import animation1 from "../../../assets/Home/show.png";
import animation2 from "../../../assets/Home/animation2.png";
import animation3 from "../../../assets/Home/animation3.png";
import { WestText } from "../../../components";

const Animation = () => {
  return (
    <>
      <div className="sm:px-16 xs:px-4 px-2 overflow-hidden py-8 sm:py-14 md:py-[8rem] lg:px-[6rem]">
        <div className="flex justify-center md:justify-start pb-10">
          <img src={logo} alt="Amour" />
        </div>
        <div
          className="flex justify-center items-center h-[35vh] sm:h-[45vh] md:h-[70vh]"
          data-aos="slide-up"
          data-aos-delay="150"
        >
          <div data-aos="fade-up" data-aos-delay="150">
            <WestText />
          </div>
          <div className="h-[70vh] w-full overflow-hidden absolute">
            <div className="items-center h-[70vh] flex justify-center">
              <img data-aos="slide-right" data-aos-delay="800" className="absolute lg:h-[30vh] md:h-[25vh] sm:h-[15vh] h-[10vh] z-30 md:mr-[26rem] sm:mr-[12rem] mr-[8rem] mb-[5rem]" src={animation2} alt="image3" />
              <div className="bg-background_primary px-5 lg:px-10 flex justify-center items-center rounded-b-full">
                <img data-aos="slide-up" data-aos-delay="700" className="lg:h-[70vh] md:h-[50vh] sm:h-[30vh] h-[25vh] z-10 md:ml-10 ml-5" src={animation1} alt="image2" />
              </div>
              <img data-aos="slide-left" data-aos-delay="900" className=" absolute lg:h-[30vh] md:h-[25vh] sm:h-[15vh] h-[10vh] z-30 md:ml-[25rem] sm:ml-[12rem] ml-[8rem] mt-[5rem]" src={animation3} alt="image1" />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center lg:justify-start mt-10 items-center">
          <span className=" text-primary text-center lg:text-start font-medium text-base md:text-lg lg:text-xl font-secondary_font">
            Go western with
            <br />
            Amour
          </span>
        </div>
      </div>
    </>
  );
};

export default Animation;
