import React from "react";
import SideMenu from "./SideMenu";

const Header = (props) => {
    return (
        <div>
            <header className="app-header fixed-top">
                <div className="app-header-inner">
                    <div className="container-fluid py-2">
                        <div className="app-header-content">
                            <div className="row justify-content-between align-items-center">

                                <div className="col-auto">
                                    <a id="sidepanel-toggler" className="sidepanel-toggler d-inline-block d-xl-none"
                                       href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                             viewBox="0 0 30 30" role="img">
                                            <title>Menu</title>
                                            <path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10"
                                                  stroke-width="2"
                                                  d="M4 7h22M4 15h22M4 23h22"></path>
                                        </svg>
                                    </a>
                                </div>
                                <div className="search-mobile-trigger d-sm-none col">
                                    <i className="search-mobile-trigger-icon fas fa-search"></i>
                                </div>
                                <div className="app-search-box col p-1">
                                    {"athlete management system " + props.history.location.pathname}
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <SideMenu history={props.history}/>
            </header>
        </div>
    );
}

export default Header;
