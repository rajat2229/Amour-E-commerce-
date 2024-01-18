import React from 'react'
import { RotatingLines } from "react-loader-spinner"
const LoadingOverlay = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
            <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh', fontSize: 40 }}>
                <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                />
            </p>
        </div>
    )
}

export default LoadingOverlay
