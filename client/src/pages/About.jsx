import { AppText, Heading } from "../components";
import Hero from "../assets/Home/heroM.png"
const About = () => {
  return (
    <>
      <div className=" hidden mt-14 mb-12 md:flex justify-center items-center">
        <div className=" w-[60%] h-[60vh] flex justify-center items-center flex-col px-14 py-20 bg-background_primary">
          <Heading className=" mb-6 " >About Us</Heading>
          <AppText className="text-center lg:w-[80%]">
            First of all,thank you for the purchase and for being a part of our amour family.
            <br />
            I am overwhelmed to share that you are one of the first 500 customers of Amour.
            <br />
            We share a secret love for clothes. Even if we have a lot of them(which is not,right?),we try to keep it a secret affair. That is exactly what Amour means To have a secret love affair.
            <br />
            Either way, it is your trust and feedback that will make Amour fill the love of the next thousands to come. I hope that you like what you are seeing right now.
            Let us know whatever you feel like. Also, do share your beautiful pictures along with feedback
          </AppText>
        </div>
        <div className=" w-[40%] h-[60vh] flex justify-center items-end ">
          <img className=" w-[100%] lg:h-[28rem] mb-[-1rem] lg:mb-[-1.5rem] md:w-[100%] object-contain " src={Hero} alt="About" />
        </div>
      </div>
      <Heading className=" mt-16 text-4xl mb-8 md:hidden ">About Us</Heading>
      <div className=" md:hidden mb-8 flex py-8 px-5 bg-background_primary justify-center items-center flex-col ">
        <img className="w-[100%] mb-6 " src={Hero} alt="About" />
        <AppText className="text-center max-w-max ">
          First of all,thank you for the purchase and for being a part of our amour family.
          <br />
          I am overwhelmed to share that you are one of the first 500 customers of Amour.
          <br />
          We share a secret love for clothes. Even if we have a lot of them(which is not,right?),we try to keep it a secret affair. That is exactly what Amour means To have a secret love affair.
          <br />
          Either way, it is your trust and feedback that will make Amour fill the love of the next thousands to come. I hope that you like what you are seeing right now.
          Let us know whatever you feel like. Also, do share your beautiful pictures along with feedback
        </AppText>
      </div>
    </>
  );
};

export default About;
