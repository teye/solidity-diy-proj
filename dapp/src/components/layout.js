import Navbar from "./navbar";
import React from 'react';

function LayoutDefault(props) {
    return (
        <div className="max-w-full">
            <Navbar />
            { props.children }
        </div>
    );
}

export default LayoutDefault;