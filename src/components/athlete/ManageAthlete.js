import React, {useEffect, useState} from "react";
import Footer from "../common/Footer";
import Loader from "react-loader-spinner";
import {API, countries, THEME_COLOR_CODE} from "../../constants/Constants";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import AthleteSearchItem from "./AthleteSearchItem";
import UpdateModal from "./UpdateModal";
import {Link} from "react-router-dom";

import {API_ROUTES} from "../../constants/Routes";
import {ROUTES} from "../../constants/Routes";
//services
import {getAllGenders, searchAthlete} from "../../services/athlete-service";
import {getAllEvents} from "../../services/event-service";

const ManageAthlete = (props) => {
    const [athlete, setAthlete] = useState(0);
    const [show, setShow] = useState(false);
    const [modalId, setModalId] = useState(0);

    const handleClose = () => {
        searchOnClick();
        setShow(false);
    }

    const handleShow = (athlete) => {
        setModalId((modalId+1));
        setAthlete(athlete);
        setShow(true)
    };

    const [genders, setGenders] = useState([]);
    const [events, setEvents] = useState([]);

    //selected values
    let selectedEvent = "";
    const [selectedEv, setSelectedEv] = useState('');
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedEventId, setSelectedEventId] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [name, setSelectedName] = useState("");
    const [athletes, setAthletes] = useState([]);

    useEffect(() => {
        getGenders();
        getEvents();
    }, []);

    const [loaderGender, setLoaderGender] = useState(false);
    const [loaderEvents, setLoaderEvents] = useState(false);
    const [loaderSubmit, setLoaderSubmit] = useState(false);

    const getGenders = () => {
        setLoaderGender(true);
        getAllGenders()
            .then(result => {
                setLoaderGender(false);
                setGenders(result);
                setSelectedGender(result[0].id);
            })
            .catch(err => console.error(err));
    };

    const getEvents = () => {
        setLoaderEvents(true);
        getAllEvents()
            .then(result => {
                setLoaderEvents(false);
                setEvents(result.content);
                selectedEvent = result.content[0].eventId;
            })
            .catch(err => console.error(err));
    };

    const genderOnChange = (event) => {
        setSelectedGender(event.target.value);
    };

    let evId = "";
    const eventOnChange = (event) => {
        evId = event.eventId;
        setSelectedEventId(event.eventId);
        setSelectedEv(event);
    };


    const searchOnClick = () => {
        if (evId == ""){
            if(selectedEventId == "")
                evId = 0
            else
                evId = selectedEventId;
        }
        const searchUrl = `${API}${API_ROUTES.athlete_base_url}${API_ROUTES.search_url}?page=0&limit=10&eventId=${evId}&genderId=${selectedGender}&country=${typeof selectedCountry.code !== 'undefined' ? selectedCountry.code : ""}&firstName=${name}`

        setAthletes([]);
        setTotalPages(0);
        setCurrentPage(1);
        setLoaderSubmit(true);
        searchAthlete(searchUrl)
            .then(data => {
                setLoaderSubmit(false);
                setAthletes(data.content);
                setTotalPages(data.totalPages)
            })
            .catch(err => console.error(err));
    };

    const onPaginationClick = (pageNo) => {
        if (evId == ""){
            if(selectedEventId == "")
                evId = 0
            else
                evId = selectedEventId;
        }
        const searchUrl = `${API}${API_ROUTES.athlete_base_url}${API_ROUTES.search_url}?page=${pageNo}&limit=10&eventId=${evId}&genderId=${selectedGender}&country=${typeof selectedCountry.code !== 'undefined' ? selectedCountry.code : ""}&firstName=${name}`

        setAthletes([]);
        setTotalPages(0);
        setLoaderSubmit(true);
        searchAthlete(searchUrl)
            .then(data => {
                setLoaderSubmit(false);
                setAthletes(data.content);
                setTotalPages(data.totalPages)
                setCurrentPage(pageNo+1);
            })
            .catch(err => console.error(err));
    };

    const createPagination = (totalPages) => {
            let pagination = [];
            for (let i = 0; i < totalPages; i++){
                pagination.push(<li style={{cursor: 'pointer'}} className={(i+1) == currentPage ? "page-item active" : "page-item"}><a className="page-link" onClick={() => onPaginationClick(i)}>{i+1}</a></li>);
            }

            return (
                <ul className="pagination justify-content-center">
                    <li className={currentPage === 1 ? "page-item disabled" : "page-item"} onClick={() => onPaginationClick((currentPage-2))}>
                        <div className="page-link" style={{cursor: 'pointer'}}>Previous</div>
                    </li>
                        {pagination}
                    <li className={currentPage === totalPages ? "page-item disabled" : "page-item"} onClick={() => onPaginationClick(currentPage)}>
                        <div className="page-link" style={{cursor: 'pointer'}}>Next</div>
                    </li>
                </ul>
            );
    };


    const onClearClick = () => {
        setAthletes([]);
        setTotalPages(0);
        setCurrentPage(1);
        setLoaderSubmit(false);
        setSelectedEventId("");
        setSelectedName("");
        setCurrentPage(1);
        setTotalPages(0);
        setSelectedGender(genders[0].id);
        setSelectedCountry("");
        setSelectedEv('');
    };

    return (
        <div>
            <div className="app-wrapper">

                <div className="app-content pt-3 p-md-3 p-lg-4">
                    <div className="container-xl">
                        <h1 className="app-page-title">Search Athlete</h1>
                        <hr className="mb-4"/>
                        <div className="row">
                            <div className="col-12">
                                <div className="app-card app-card-settings shadow-sm p-4">
                                    <div className="app-card-body">
                                        <div className="row">
                                            <div className="col-6">
                                                <input className="form-control"
                                                       value={name}
                                                       onChange={(e)=> setSelectedName(e.target.value)}
                                                       placeholder="Athlete Name"/>
                                            </div>
                                            <div className="col-6">
                                                {!loaderGender ? (
                                                    <select className="form-select" onChange={genderOnChange}>
                                                        {
                                                            genders.map(gender => (
                                                                <option value={gender.id} selected={selectedGender == gender.id}>{gender.type}</option>
                                                            ))
                                                        }
                                                    </select>
                                                ) : (
                                                    <div className="col-12 align-self-center text-start">
                                                        <Loader type="Bars" color={THEME_COLOR_CODE} height={30} width={80} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-6 mt-3">
                                                <Autocomplete
                                                    onChange={(event, newValue) => {
                                                        setSelectedCountry(newValue ? newValue : '')
                                                    }}
                                                    value={selectedCountry}
                                                    id="country-select-demo"
                                                    sx={{ width: '100%' }}
                                                    options={countries}
                                                    autoHighlight
                                                    getOptionLabel={options => options.label ? options.label + " - " + options.code : options}
                                                    renderOption={(props, option) => (
                                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                            <img
                                                                loading="lazy"
                                                                width="20"
                                                                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                                alt=""
                                                            />
                                                            {option.label} ({option.code}) +{option.phone}
                                                        </Box>
                                                    )}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Choose a country"
                                                            value={""}
                                                            inputProps={{
                                                                ...params.inputProps,
                                                                autoComplete: 'new-password', // disable autocomplete and autofill
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div className="col-6">
                                                {!loaderEvents ? (
                                                    <Autocomplete
                                                        onChange={(event, value) => eventOnChange(value)}
                                                        freeSolo
                                                        value={selectedEv}
                                                        id="free-solo-2-demo"
                                                        disableClearable
                                                        options={events.map((option) => option)}
                                                        getOptionLabel={options => options.name ? options.name : options}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                id={'eventAutoComplete'}
                                                                label={'Select Event'}
                                                                margin="normal"
                                                                variant="outlined"
                                                                InputProps={{...params.InputProps, type: 'search'}}
                                                            />
                                                        )}
                                                    />
                                                ) : (
                                                    <div className="col-12 align-self-center text-start">
                                                        <Loader type="Bars" color={THEME_COLOR_CODE} height={30} width={80} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="row mt-5">
                                            <div className="col-auto">
                                                <button className="btn app-btn-primary" onClick={searchOnClick}>
                                                    Search
                                                </button>
                                            </div>
                                            <div className="col-auto">
                                                <Link to={ROUTES.create_athlete_page} className="btn btn-secondary">
                                                    New
                                                </Link>
                                            </div>
                                            <div className="col-auto">
                                                <button className="btn btn-danger" onClick={onClearClick}>
                                                    clear
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            {
                                loaderSubmit ? ("Loading") : (
                                    athletes.map(athlete => (
                                        <AthleteSearchItem handleShow={handleShow} athlete={athlete}/>
                                    ))
                                )
                            }
                        </div>
                        <div className="row mt-3">
                            <div className="col-12">
                                <nav className="app-pagination mt-5">
                                    {athletes.length > 0 ? createPagination(totalPages) : ''}
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>


                <Footer props={props} />
            </div>
            {/*Update modal*/}
            <UpdateModal show={show} handleClose={handleClose} athlete={athlete} modalId={modalId}/>
        </div>
    );
}

export default ManageAthlete;
