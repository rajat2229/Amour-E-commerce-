import React, { useRef } from 'react'
import "./dropDown.css"
const DropDown = ({ option,handleDropValue,inputVal }) => {
    const drop = useRef();
    const value = useRef();
    function handleClick() {
        drop.current.classList.toggle('active');
    }
    function handleValue(anything) {
        value.current.value = anything;
        handleDropValue(anything);
    }
    return (
        <div ref={drop} onClick={handleClick} className="dropdown">
            <input ref={value} type="text" onClick={handleClick} value={inputVal} className="textBox" placeholder="--Category--" readOnly disabled />
            <div className="option">
                {
                    option.map((item, key) => {
                        return <div key={key} onClick={() => handleValue(`${item}`)}>{item}</div>
                    })
                }
            </div>
        </div>
    )
}

export default DropDown
