import React from "react";
import "style.css"

const ProfileContent = (props) => {
    return (
        <div className="Profile-content">
            <h1>{props.title}</h1>
            <div>
                {props.nameTitle}: <b>{props.name}</b>
            </div>
            <div>
                {props.phoneTitle}: <b>{props.phone}</b>
            </div>
            <div>
            {'email'}: <b>{props.email}</b>
            </div>
            
        </div>
    )
}

export default ProfileContent;