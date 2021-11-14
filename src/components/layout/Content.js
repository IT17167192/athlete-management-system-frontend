import React from "react";
import * as Routes from '../../constants/Routes';
import Home from "../home/Home";
import CreateAthlete from "../athlete/CreateAthlete";
import ManageAthlete from "../athlete/ManageAthlete";

const appendView = (props) => {

    if (props.history.location.pathname === Routes.ROUTES.landing_page) {
        return (
            <Home pathname={props.history.location.pathname}/>
        );
    }else if(props.history.location.pathname === Routes.ROUTES.create_athlete_page){
        return (
            <CreateAthlete pathname={props.history.location.pathname}/>
        );
    }else if(props.history.location.pathname === Routes.ROUTES.manage_athlete_page){
        return (
            <ManageAthlete pathname={props.history.location.pathname}/>
        );
    }else{
        return (
            "Page 404"
        );
    }
    //common components end
};

const WebLayout = (props) => {
    return (
        appendView(props)
    );
};

export default WebLayout;
