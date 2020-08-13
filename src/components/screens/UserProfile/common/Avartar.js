import React from 'react';
import user from "../../../../assets/download.png"

export default function Avartar(props) {
    let { photo, userid, ownerID } = props
    const check = (userid === ownerID || !userid) ? true : false
    return (
        <div className={`avartar-profile ${!check ? '' : 'hover-avatar'}`}>
            <img
                className="avartar-img "
                src={photo ? photo :
                    user
                } alt="avatar"
            />
            {!check ? "" :
                <div className="icon-avartar">
                    <a  href="#"
                        className=" modal-trigger"
                        data-target="modal1"
                    >
                        <i className="material-icons small" >cloud_upload</i>
                    </a>
                </div>
            }
        </div>
    )
}
