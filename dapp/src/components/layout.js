import Navbar from "./navbar";
import React from 'react';
import { Toaster } from 'react-hot-toast';


function LayoutDefault(props) {
    return (
        <div className="max-w-full">
            <Navbar />
            { props.children }
            <Toaster 
                position="bottom-right"
                reverseOrder={false}
            />
        </div>
    );
}

export default LayoutDefault;