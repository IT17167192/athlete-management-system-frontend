import React, {useEffect, useState} from "react";
import {Image} from "react-bootstrap";
import {countries} from "../../constants/Constants";

const AthleteSearchItemm = (props) => {
    const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10);
    const getCountryName = (code) => {
        let countryName = '';
        countries.forEach(c => {
            if(c.code == code) {
                countryName = c.label;
            }
        })
        return (
            <span>
                {countryName}
            </span>
        )
    }
    return (
        <div className="col-12 col-md-4 col-xl-4 col-xxl-2 mt-3">
            <div className="app-card app-card-doc shadow-sm  h-100">
                <div className="app-card-thumb-holder p-3">
                    <div className="app-card-thumb">
                        <Image className="w-100 h-100 thumb-image" src={ 'data:image/png;base64, '+ props.athlete.image} alt="" />
                    </div>
                    <a className="app-card-link-mask" href="#file-link"></a>
                </div>
                <div className="app-card-body p-3 has-card-actions mt-5">

                    <h4 className="app-doc-title truncate mb-0" style={{cursor: 'pointer'}}><a onClick={() => props.handleShow(props.athlete)}>{props.athlete.firstName + " " + props.athlete.lastName}</a></h4>
                    <div className="app-doc-meta" style={{cursor: 'pointer'}}>
                        <ul className="list-unstyled mb-0">
                            <li><span className="text-muted" onClick={() => props.handleShow(props.athlete)}>Age:</span> {getAge(props.athlete.dob)}</li>
                            <li>
                                <span className="text-muted" onClick={() => props.handleShow(props.athlete)}>
                                    Country :{' '}<img
                                    loading="lazy"
                                    width="27"
                                    src={`https://flagcdn.com/w20/${props.athlete.country.toLowerCase()}.png`}
                                    srcSet={`https://flagcdn.com/w40/${props.athlete.country.toLowerCase()}.png 2x`}
                                    alt=""
                                />
                                </span>
                                {' '} {getCountryName(props.athlete.country)}
                            </li>
                        </ul>
                    </div>
                    <div className="app-card-actions" style={{cursor: 'pointer'}}>
                        <div className="dropdown">
                            <div className="dropdown-toggle no-toggle-arrow" data-bs-toggle="dropdown"
                                 aria-expanded="false">
                                <svg width="1em" height="1em" viewBox="0 0 16 16"
                                     className="bi bi-three-dots-vertical" fill="currentColor"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                </svg>
                            </div>
                            <ul className="dropdown-menu" >
                                <li><a className="dropdown-item" onClick={() => props.handleShow(props.athlete)}>
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil me-2"
                                         fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                              d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                    </svg>
                                    Edit</a></li>
                            </ul>
                        </div>
                    </div>
                    <hr className="mb-3"/>

                    <div className="row mt-2">
                        <div className="col-12">
                            {props.athlete.results.length > 0 ? (
                                <table className="table app-table-hover mb-0 text-left">
                                    <thead>
                                    <tr>
                                        <th className="cell">Event</th>
                                        <th className="cell">Round</th>
                                        <th className="cell">Result</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {props.athlete.results.map(res => (
                                            <tr>
                                                <td className="cell">{res.event.name}</td>
                                                <td className="cell">
                                                    {res.round}
                                                </td>
                                                <td className="cell">
                                                    {res.place}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ): "No Results found!"}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default AthleteSearchItemm;

