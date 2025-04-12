import React from "react";
import "../styles/loader.css";

const Loader: React.FC = () => {
    return (
        <div className="loader-wrapper">
            <div className="loader"></div>
        </div>
    );
};

export default Loader;