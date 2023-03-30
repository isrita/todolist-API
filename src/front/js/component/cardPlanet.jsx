/* import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const CardPlanet = (props) => {
    const { store, actions } = useContext(Context)
    return (<>
        <div className="card" style={{ width: "18rem" }}>
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <Link to={`/planet/${props.uid}`} className="btn btn-primary">Learn More!</Link>
                <button type="button" onClick={() => {
                    actions.agregarFavorito({
                        name: props.name,
                        uid: props.uid,
                        category: "planet",
                        link: `/planet/${props.uid}`
                    })
                }}>
                    Like
                </button>
            </div>
        </div>
    </>)
}

export default CardPlanet; */