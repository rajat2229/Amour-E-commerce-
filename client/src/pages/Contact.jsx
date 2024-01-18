import React, { useState } from 'react'
import { AppText, Button, ContactInput, Heading } from '../components'
import hero from "../assets/Home/heroM.png"
import show from "../assets/Home/show.png"
import facebook from "../assets/facebook.svg"
import instagram from "../assets/instagram.svg"
import linkedin from "../assets/linkedin.svg"
import styles from '../style'
import { ContactForm } from '../http/utils'
import { toast } from 'react-toastify'
import CheckEmail from '../utility/CheckEmail'




const Contact = () => {
  const [conForm, setConForm] = useState({
    name: '',
    email: '',
    message: ''
  })

  const { name, email, message } = conForm;

  const handleChange = (e) => {
    setConForm({ ...conForm, [e.target.name]: e.target.value })
  }
  const submitForm = async () => {
    if (email === "" || name === "" || message === '') {
      toast.error("Please enter all fields");
      return;
    }
    if (!CheckEmail(email)) {
      toast.error("Please enter a correct email");
      return;
    }
    const value = await ContactForm(name, email, message);
    if (value.code === "ERR_NETWORK") {
      toast.error("Some error occured");
      return;
    }
    if (!value.success) {
      toast.error(value.message);
      return;
    }
    else {
      toast.success("Message sent successfully");
      setConForm({
        name: "",
        email: '',
        message: ''
      })
    }
  }

  return (
    <div>
      <Heading className={"my-8 text-5xl"}>Contact Us</Heading>
      <div className='flex w-full'>
        <div className='bg-background_primary py-10 px-6 md:px-16 md:flex-1 lg:py-14 lg:px-16 lg:flex lg:justify-around lg:flex-row-reverse'>
          <div className='py-16 lg:py-8 flex lg:flex lg:flex-[1.5]'>
            <div className='flex-1 lg:flex lg:gap-6 lg:flex-col lg:items-center'>
              <div className={`flex flex-col gap-3`}>
                <AppText className={"opacity-70 lg:text-center"}>Email</AppText>
                <AppText className={"lg:text-center"}>amourclothings@gmail.com</AppText>
              </div>
              <div className={`flex flex-col gap-3 mt-4`}>
                <AppText className={"opacity-70 lg:text-center"}>Contact</AppText>
                <AppText className={"lg:text-center"}>7696881805</AppText>
              </div>
              <div className='mt-10 flex gap-5'>
                <img className="cursor-pointer" onClick={() => window.open("https://www.instagram.com/myamour.in/")} src={instagram} alt="instagram" />
                <img src={facebook} alt="Facebook" />
                <img src={linkedin} alt="linkedin" />
              </div>
            </div>
            <div className='flex-1 flex justify-center items-center lg:hidden'>
              <img className='w-[500px] hidden lg:block' src={hero} alt="Contact Image" />
              <img className='w-[90%] block md:w-[50%] lg:hidden' src={show} alt="Contact Image" />
            </div>
          </div>
          <div className='lg:flex-[2]'>
            <div>
              <ContactInput
                placeholder={"Enter name"}
                name="name"
                value={name}
                handleChange={handleChange}
              />
              <ContactInput
                placeholder={"Enter email"}
                type="email"
                name="email"
                value={email}
                handleChange={handleChange}
              />
              <ContactInput
                placeholder={"Message"}
                name="message"
                value={message}
                handleChange={handleChange}
              />
              <div className={`${styles.flexCenter} mt-8 lg:items-start lg:justify-start`}>
                <Button
                  title="Contact Us"
                  handleSubmit={submitForm}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='hidden lg:flex lg:flex-1 lg:justify-center lg:items-center'>
          <img className='w-[500px] hidden lg:block' src={hero} alt="Contact Image" />
          <img className='w-[500px] block lg:hidden' src={show} alt="Contact Image" />
        </div>
      </div>
    </div>
  )
}

export default Contact
