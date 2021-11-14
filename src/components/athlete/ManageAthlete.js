import React, {useEffect, useState} from "react";
import Footer from "../common/Footer";
import {getAllGenders, searchAthlete} from "../../services/athlete-service";
import {getAllEvents} from "../../services/event-service";
import Loader from "react-loader-spinner";
import {API, countries, THEME_COLOR_CODE} from "../../constants/Constants";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import AthleteSearchItem from "./AthleteSearchItem";
import {API_ROUTES} from "../../constants/Routes";

const ManageAthlete = (props) => {
    const [genders, setGenders] = useState([]);
    const [events, setEvents] = useState([]);

    //selected values
    let selectedEvent = "";
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedEventId, setSelectedEventId] = useState("");
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
    const eventOnChange = (id) => {
        console.log(id);
        evId = id;
        setSelectedEventId(id);
    };


    const searchOnClick = () => {
        if (evId == ""){
            console.log(selectedEventId == "")
            if(selectedEventId == "")
                evId = 0
            else
                evId = selectedEventId;
        }
        const searchUrl = `${API}${API_ROUTES.athlete_base_url}${API_ROUTES.search_url}?eventId=${evId}&genderId=${selectedGender}&country=${selectedCountry}&firstName=${name}`
        console.log(searchUrl);
        setAthletes([]);
        setLoaderSubmit(true);
        searchAthlete(searchUrl)
            .then(data => {
                setLoaderSubmit(false);
                setAthletes(data);
            })
            .catch(err => console.error(err));
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
                                                                <option value={gender.id}>{gender.type}</option>
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
                                            <div className="col-6">
                                                <Autocomplete
                                                    onChange={(event, newValue) => {
                                                        setSelectedCountry(newValue.code)
                                                    }}
                                                    id="country-select-demo"
                                                    sx={{ width: 300 }}
                                                    options={countries}
                                                    autoHighlight
                                                    getOptionLabel={(option) => option.label}
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
                                                        onChange={(event, newValue) => {
                                                            eventOnChange(newValue ? newValue.eventId : "")
                                                        }}
                                                        id="id-event"
                                                        sx={{ width: '100%' }}
                                                        options={events}
                                                        autoHighlight
                                                        getOptionLabel={(option) => option.name}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Select Event"
                                                                value={events}
                                                                inputProps={{
                                                                    ...params.inputProps,
                                                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                                                }}
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
                                                <button className="btn btn-secondary">
                                                    New
                                                </button>
                                            </div>
                                            <div className="col-auto">
                                                <button className="btn btn-danger">
                                                    clear
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            {console.log(athletes)}
                            {
                                loaderSubmit ? ("Loading") : (
                                    athletes.map(athlete => (
                                        <AthleteSearchItem athlete={athlete}/>
                                    ))
                                )
                            }
                        </div>
                    </div>
                </div>
                <Footer props={props} />
            </div>
        </div>
    );
}

export default ManageAthlete;
