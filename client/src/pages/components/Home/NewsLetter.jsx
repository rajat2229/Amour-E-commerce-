import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { AppDesc, Heading, NewsInput } from '../../../components'
import { NewsLetterForm } from '../../../http/utils';
import CheckEmail from '../../../utility/CheckEmail';

const NewsLetter = () => {
  const [email,setEmail] = useState("");
  const handleChange = (e)=>{
    setEmail(e.target.value);
  }
  const handleSubmit = async()=>{
    if(email === ''){
      toast.error("Please enter email");
      return;
    }
    if(!CheckEmail(email)){
      toast.error("Please enter a valid email");
      return;
    }
    const value = await NewsLetterForm(email);
    if (value.code === "ERR_NETWORK") {
      toast.error("Some error occured");
      return;
    }
    if (!value.success) {
      toast.error(value.message);
    }
    else {
      toast.success("Newsletter Signup completed successfully");
      setEmail("");
    }
  }
  return (
    <div className={`bg-background_secondary flex flex-col items-center py-14 px-10`}>
      <div className='lg:max-w-5xl flex flex-col items-center justify-around gap-7 md:gap-10 lg:gap-16'>
        <Heading style={{color:'white'}}>Hear from the House</Heading>
        <AppDesc style={{color:'white'}}>The updates and latest trends of the market is now shared with the users through the expertise gained by the folks at Amour overtime.</AppDesc>
        <NewsInput
        value={email}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

export default NewsLetter
