import React from "react";
import PropTypes from "prop-types";
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

ProfileContent.propTypes = {
    title:  PropTypes.string,
    nameTitle: PropTypes.string,
    name: PropTypes.string,
    phoneTitle: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
}

ProfileContent.defaultProps = {}

export default ProfileContent;