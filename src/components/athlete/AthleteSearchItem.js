import React, {useEffect, useState} from "react";
import {Image} from "react-bootstrap";

const AthleteSearchItemm = (props) => {
    const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10);

    return (
        <div className="col-12 col-md-4 col-xl-4 col-xxl-2 mt-3">
            <div className="app-card app-card-doc shadow-sm  h-100">
                <div className="app-card-thumb-holder p-3">
                    <div className="app-card-thumb">
                        <Image className="w-100 h-100 thumb-image" src={ 'data:image/png;base64, '+ props.athlete.image} alt="" />
                    </div>
                    <a className="app-card-link-mask" href="#file-link"></a>
                </div>
                <div className="app-card-body p-3 has-card-actions mt-5" style={{cursor: 'pointer'}} onClick={() => props.handleShow(props.athlete)}>

                    <h4 className="app-doc-title truncate mb-0"><a href="#file-link">{props.athlete.firstName + " " + props.athlete.lastName}</a></h4>
                    <div className="app-doc-meta">
                        <ul className="list-unstyled mb-0">
                            <li><span className="text-muted">Age:</span> {getAge(props.athlete.dob)}</li>
                            <li><span className="text-muted">Country:</span> {props.athlete.country}</li>
                        </ul>
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

