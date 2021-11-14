import React from "react";
import Footer from "../common/Footer";

const Template = (props) => {
    return (
        <div>
            <div className="app-wrapper">

                <div className="app-content pt-3 p-md-3 p-lg-4">
                    <div className="container-xl">

                    </div>
                </div>
                <Footer props={props} />
            </div>
        </div>
    );
}

export default Template;
