import React, {useState} from "react";
import Content from "./Content";
import Header from "../common/Header";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-datepicker/dist/react-datepicker.css";

const Container = (history) => {
    return (
        <div className="app">
            <Header history={history} />
            <Content history={history}/>
        </div>
    );
};

export default Container;
