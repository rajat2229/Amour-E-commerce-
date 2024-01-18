import React from 'react'
import { BallTriangle } from "react-loader-spinner"
const LoadingOverlay = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
      <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "full", minHeight: '70vh' }}>
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#eccece"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      </p>
    </div>
  )
}

export default LoadingOverlay
