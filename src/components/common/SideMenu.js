import React from "react";
import { ROUTES } from "../../constants/Routes";
import {Link} from "react-router-dom";

const SideMenu = (props) => {

    const isActive = (history, path) => {
        if (history.location.pathname === path) {
            return "nav-link active";
        } else {
            return "nav-link";
        }
    };

    const isSubActive = (history, path) => {
        if (history.location.pathname.includes(path)) {
            return "nav-link submenu-toggle active";
        } else {
            return "nav-link submenu-toggle";
        }
    };

    const isSubLinkActive = (history, path) => {
        if (history.location.pathname === path) {
            return "submenu-link active";
        } else {
            return "submenu-link";
        }
    };

    return (
        <div>
            <div id="app-sidepanel" className="app-sidepanel">
                <div id="sidepanel-drop" className="sidepanel-drop"></div>
                <div className="sidepanel-inner d-flex flex-column">
                    <a href="#" id="sidepanel-close" className="sidepanel-close d-xl-none">&times;</a>
                    <div className="app-branding">
                        <a className="app-logo" href="index.html">
                            <span className="logo-text">Athlete System</span></a>

                    </div>
                    <nav id="app-nav-main" className="app-nav app-nav-main flex-grow-1">
                        <ul className="app-menu list-unstyled accordion" id="menu-accordion">
                            {/*<li className="nav-item">*/}

                            {/*    <Link*/}
                            {/*        className={isActive(props.history, ROUTES.landing_page)}*/}
                            {/*        to={ROUTES.landing_page}>*/}
                            {/*        <span className="nav-icon">*/}
                            {/*            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-house-door"*/}
                            {/*                 fill="currentColor" xmlns="http://www.w3.org/2000/svg">*/}
                            {/*              <path fill-rule="evenodd"*/}
                            {/*                    d="M7.646 1.146a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5H9.5a.5.5 0 0 1-.5-.5v-4H7v4a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6zM2.5 7.707V14H6v-4a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4h3.5V7.707L8 2.207l-5.5 5.5z"/>*/}
                            {/*              <path fill-rule="evenodd" d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>*/}
                            {/*            </svg>*/}
                            {/*         </span>*/}
                            {/*        <span className="nav-link-text">Home</span>*/}
                            {/*    </Link>*/}
                            {/*</li>*/}

                            <li className="nav-item has-submenu">
                                <a className={isSubActive(props.history, "athlete")} href="#" data-bs-toggle="collapse"
                                   data-bs-target="#submenu-1"
                                   aria-expanded="false" aria-controls="submenu-1">
                                    <span className="nav-icon">
                                          <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-files"
                                               fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                              <path fill-rule="evenodd"
                                                    d="M4 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4z"/>
                                              <path
                                                  d="M6 0h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2v-1a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1H4a2 2 0 0 1 2-2z"/>
                                          </svg>
                                     </span>
                                    <span className="nav-link-text">Athlete Management</span>
                                    <span className="submenu-arrow">
                                         <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-down"
                                              fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                          <path fill-rule="evenodd"
                                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                                        </svg>
	                                </span>
                                </a>
                                <div id="submenu-1" className="collapse submenu submenu-1"
                                     data-bs-parent="#menu-accordion">
                                    <ul className="submenu-list list-unstyled">
                                        <li className="submenu-item">
                                            <Link to={ROUTES.create_athlete_page} className={isSubLinkActive(props.history, ROUTES.create_athlete_page)}>Create Athlete</Link>
                                        </li>

                                        <li className="submenu-item">
                                            <Link to={ROUTES.manage_athlete_page} className={isSubLinkActive(props.history, ROUTES.manage_athlete_page)} >Manage Athlete</Link>
                                        </li>

                                    </ul>
                                </div>
                            </li>

                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default SideMenu;
