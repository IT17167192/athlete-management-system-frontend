import React, {useEffect, useState} from "react";
import Footer from "../common/Footer";
import Image from 'react-bootstrap/Image';
import {useDropzone} from 'react-dropzone';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import 'date-fns';
import moment from "moment";
import Loader from "react-loader-spinner";
import {THEME_COLOR_CODE, WHITE_COLOR_CODE, countries} from "../../constants/Constants";
import DatePicker from "react-datepicker";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Services
import {addAthlete, addAthleteEvents, getAllGenders, uploadImage} from "../../services/athlete-service";
import {getAllEvents} from "../../services/event-service";
const Swal = require('sweetalert2');


const CreateAthlete = (props) => {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        country: "",
        date: moment(Date.now()).format("YYYY-MM-DD"),
        image: ""
    });

    const [error, setError] = useState(false);

    const [loaderGender, setLoaderGender] = useState(false);
    const [loaderEvents, setLoaderEvents] = useState(false);
    const [loaderSubmit, setLoaderSubmit] = useState(false);

    const {
        firstName,
        lastName,
        date,
        country,
        image
    } = values;

    const [selectedDate, setSelectedDate] = useState(Date.now());

    const [files, setFiles] = useState([]);
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const [genders, setGenders] = useState([]);
    const [events, setEvents] = useState([]);

    //selected values
    let selectedEvent = "";
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedEvents, setSelectedEvents] = useState([]);

    useEffect(() => {
        getGenders();
        getEvents();
    }, []);

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

    //Change events handlers
    const onDataChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const genderOnChange = (event) => {
        setSelectedGender(event.target.value);
    };

    const onAddButtonClicked = () => {
        const eventId = selectedEvent ? selectedEvent : events[0].eventId;
        let event;

        events.forEach(e => {
            if (e.eventId == eventId) {
                event = e;
            }
        })

        if(selectedEvents.some(item => event.eventId === item.eventId)) {
            toast.warn('Event is already added!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            //Add popup
        }else {
            setSelectedEvents([...selectedEvents, event]);
        }
    };

    const onRemoveButtonClicked = (eventId) => {
        const newArray = selectedEvents.filter(function (se) {
            return se.eventId != eventId;
        });
        setSelectedEvents(newArray);
    };

    const eventOnChange = (event) => {
        selectedEvent = event.target.value;
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setValues({ ...values, 'date': moment(date).format("YYYY-MM-DD") });
    };

    const clickOnSubmit = () => {

        setLoaderSubmit(true);
        setError(false);

        let athleteObj = {
            firstName: firstName,
            lastName: lastName,
            country: country,
            image:  "",
            dob: date,
            gender: {
                "id": selectedGender
            }
        };
        //validate athlete object
        if(formValidator(athleteObj)){
            //show error
            setError(true);
            setLoaderSubmit(false);
        }else {
            addAthlete(athleteObj)
                .then(addAthleteResponse => {
                    console.log(addAthleteResponse);
                    let athleteEvents = [];
                    selectedEvents.forEach(ev => {
                        athleteEvents.push({
                            athleteId: addAthleteResponse.athleteId,
                            eventId: ev.eventId
                        })
                    })
                    console.log(athleteEvents);
                    addAthleteEvents(athleteEvents)
                        .then(responseAthleteEvents => {
                            if(files[0]){
                                uploadImage(files[0], addAthleteResponse.athleteId)
                            }
                            setLoaderSubmit(false);
                            setValues({
                                ...values,
                                firstName: "",
                                lastName: "",
                                country: "",
                                date: moment(Date.now()).format("YYYY-MM-DD"),
                            });
                            setFiles([]);
                            setSelectedDate(Date.now());
                            setSelectedEvents([]);
                            setSelectedCountry("");

                            Swal.fire(
                                {
                                    title: 'Athlete added',
                                    text: "New athlete added successfully!",
                                    icon: 'success',
                                    confirmButtonColor: '#7AC943',
                                }
                            )
                        })

                })
                .catch(error => console.error(error));
        }

    };

    const formValidator = (athleteObj) => {
        let flag = false;
        if(!validateAthleteObject(athleteObj))
            flag = true;

        if (!validateAge(athleteObj))
            flag = true;

        if(!validateNoOfEvents())
            flag = true;

        return flag;
    }

    const validateAthleteObject = (athleteObj) => {
        if(athleteObj.firstName === "" || athleteObj.lastName === "" || athleteObj.country === "")
            return false;

        return true;
    };

    const [calenderError, setCalenderError] = useState(false);
    const validateAge = (athleteObj) => {
        setCalenderError(false);
        const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10);
        if(getAge(athleteObj.dob) < 16) {
            setCalenderError(true);
            return false;
        }
        return true;
    };

    const validateNoOfEvents = () => {
        if(selectedEvents.length === 0) {
            //show alert
            toast.warn('At least one event must be added!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            return false;
        }

        return true;
    }

    const [selectedCountry, setSelectedCountry] = useState("");

    const countryOnChange = (c) => {
        setValues({ ...values, 'country': c.code });
        setSelectedCountry(c);
    }

    return (
        <div>
            <div className="app-wrapper">
                <div className="app-content pt-3 p-md-3 p-lg-4">
                    <div className="container-xl">
                        <h1 className="app-page-title">Create Athlete</h1>
                        <hr className="mb-4"/>
                        <div className="row g-4 settings-section">
                            <div className="col-12 col-md-4">
                                <h3 className="section-title">Athlete Photo</h3>
                                <div className="row mt-3">
                                    <div className="col-12">
                                        {
                                            files[0] && (
                                                <Image className="w-100 h-100"
                                                       src={files[0] ? files[0].preview : 'Upload Image'}/>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-12 text-center">
                                                <button {...getRootProps({className: "dropzone"})}
                                                        className="btn app-btn-primary mt-3">
                                                    <input {...getInputProps()} />
                                                    {(<p className="pt-2">Upload Photo</p>)}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-8">
                                <div className="app-card app-card-settings shadow-sm p-4">

                                    <div className="app-card-body">
                                        <div className="settings-form">
                                            <div className="mb-3">
                                                <label className="form-label">First Name</label>
                                                <input type="text" value={firstName}
                                                       onChange={onDataChange('firstName')}
                                                       className="form-control"
                                                       style={{borderColor: firstName == "" && error ? 'red' : ''}}/>
                                            </div>
                                            <div className="mb-1">
                                                <label className="form-label">Last Name</label>
                                                <input type="text" value={lastName}
                                                       onChange={onDataChange('lastName')}
                                                       className="form-control" required
                                                       style={{borderColor: lastName == "" && error ? 'red' : ''}}/>
                                            </div>
                                            <div className="mt-3 mb-3">
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col-4 align-self-center">
                                                            <label className="form-label">Date of Birth</label>
                                                        </div>
                                                        <div className="col-8">
                                                            <DatePicker
                                                                selected={selectedDate}
                                                                onChange={(date) => handleDateChange(date)} />
                                                        </div>
                                                    </div>
                                                    <div className="row mt-3" style={{display: error && calenderError ? '' : 'none'}}>
                                                        <div className="col-4">

                                                        </div>
                                                        <div className="col-8 align-self-center" style={{color: "red"}}>
                                                            Age should greater than 16
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-1">
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col-4 align-self-center">
                                                            <label className="form-label">Gender</label>
                                                        </div>
                                                        <div className="col-8">
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
                                                </div>
                                            </div>
                                            <div className="col-12 mt-3 mb-3">
                                                <div className="row">
                                                    <div className="col-4 align-self-center">
                                                        <label className="form-label">Country</label>
                                                    </div>
                                                    <div className="col-8">
                                                        <Autocomplete
                                                            onChange={(event, newValue) => {
                                                                countryOnChange(newValue ? newValue : '');
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
                                                                    error={error && country === ""}
                                                                    {...params}
                                                                    label="Choose a country"
                                                                    value={country}
                                                                    inputProps={{
                                                                        ...params.inputProps,
                                                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="row mt-3 g-4 settings-section">
                            <div className="col-12">
                                <div className="app-card app-card-settings shadow-sm p-4">
                                    <div className="app-card-body">
                                        <div className="row g-3 mb-4 align-items-center justify-content-between">
                                            <div className="col-auto">
                                                <h1 className="app-page-title mb-0">Events</h1>
                                            </div>
                                            <div className="col-auto">
                                                <div className="page-utilities">
                                                    <div
                                                        className="row g-2 justify-content-start justify-content-md-end align-items-center">
                                                        <div className="col-auto">
                                                            {!loaderEvents ? (
                                                                <select className="form-select w-auto" onChange={eventOnChange}>
                                                                    {
                                                                        events.map(event => (
                                                                            <option value={event.eventId}>{event.name}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            ) : (
                                                                <div className="col-12 align-self-center text-start">
                                                                    <Loader type="Bars" color={THEME_COLOR_CODE} height={30} width={80} />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="col-auto">
                                                            <div className="col-auto">
                                                                <button type="submit"
                                                                        onClick={onAddButtonClicked}
                                                                        className="btn app-btn-secondary">Add
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table app-table-hover mb-0 text-left">
                                                <thead>
                                                    <tr>
                                                        <th className="cell">Event Name</th>
                                                        <th className="cell">Remove</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        selectedEvents.map(e => (
                                                            <tr>
                                                                <td className="cell">{e.name}</td>
                                                                <td className="cell">
                                                                    <a style={{cursor: "pointer"}}
                                                                        onClick={() => onRemoveButtonClicked(e.eventId)}
                                                                        className="btn-sm btn-outline-danger">X</a>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="text-end">
                                <button className="btn app-btn-primary"
                                        onClick={clickOnSubmit}
                                        disabled={loaderEvents & loaderGender & loaderSubmit}>
                                    {loaderSubmit ? (<Loader type="Bars" color={WHITE_COLOR_CODE} height={10} width={30} />) : 'Save'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
                <Footer props={props}/>
            </div>
        </div>
    );
}

export default CreateAthlete;
