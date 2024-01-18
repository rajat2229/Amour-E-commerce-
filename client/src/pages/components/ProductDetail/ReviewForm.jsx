import React, { useRef, useState } from 'react'
import { Button, StarRating2 } from '../../../components';
import { createReview } from '../../../http/product';
import { toast } from 'react-toastify'

const ReviewForm = (props) => {
  const reviewMsgRef = useRef();
  const [reviewMsg, setReviewMsg] = useState("");
  const [reviewStars, setReviewStars] = useState(1);

  async function handleReviewSubmit() {
    if (reviewMsg === '') {
      toast.error("Please enter in input")
      return;
    }
    const value = await createReview(props.productId, reviewStars, reviewMsg);
    if (value.code === "ERR_NETWORK") {
      toast.error("Some error occured");
      return;
    }
    if (!value.success) {
      toast.error(value.message);
    }
    else {
      // toast.success("Review added");
      setReviewMsg("");
      setReviewStars(1);
      props.handleRefresh();
    }
    setReviewMsg("");
    setReviewStars(1);
  }

  return (
    <div>
      <div className="flex md:border border-background_primary bg-[#eccece86] py-5 pb-10 px-10 md:px-5 rounded-lg md:bg-transparent items-center mt-10 space-x-6">
        <div className="flex flex-col xs:flex-row items-center w-full space-x-6">
          <span className=" px-6 h-12 rounded-full w-12 flex justify-center items-center text-primary bg-background_tertiary">
            R
          </span>
          <div className="flex flex-col w-[100%]">
            <div className="text-xl font-secondary_font font-semibold text-primary lg:text-2xl">
              Enter your review
              <div
                ref={reviewMsgRef}
                contentEditable
                onInput={(e) => {
                  setReviewMsg(e.currentTarget.textContent);
                }}
                className="font-light flex-1 mt-5 lg:mt-8 font-secondary_font text-primary text-base lg:text-lg xl:text-2xl outline-none border-b border-border_primary"
              />
            </div>
            <div className="flex justify-between flex-col sm:flex-row mt-5 sm:items-center sm:space-x-4 lg:space-x-8">
              <span className=" text-xl mb-5 md:mb-0 font-secondary_font font-semibold text-primary lg:text-2xl ">
                &nbsp;Rating
                <StarRating2
                  rating={reviewStars}
                  setRating={setReviewStars}
                />
              </span>
              <Button
                handleSubmit={handleReviewSubmit}
                title={"Submit"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewForm
