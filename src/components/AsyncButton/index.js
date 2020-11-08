import React from 'react'
import BeatLoader from "react-spinners/BeatLoader";

const AsyncButton = ({ loading, content, spinnerSize, classname }) => {
    return (
        <button className={`btn ${classname}`} type="submit">
            {loading ? <BeatLoader color="#fff" size={spinnerSize} /> : `${content}`}
        </button>
    )
}

export default AsyncButton;
