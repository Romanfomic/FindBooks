import React from "react";

export function Book(){
    return(
        <div className="card m-2" style={{ width: '18rem' }}>
            <img className="card-img-top" src="..."></img>
            <div className="card-body">
                <h5 className="card-title">Name of book</h5>
                <p className="card-text">Authors</p>
                <p className="text-secondary">category</p>
            </div>
        </div>
    )
}