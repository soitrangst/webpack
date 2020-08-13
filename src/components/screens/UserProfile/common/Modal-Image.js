import React, { useEffect, useRef, useState } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

const Modal = (props) => {
    const [file, setFile] = useState('')
    const imageModal = useRef(null)
    const { updateAvartar } = props

    useEffect(() => {
        const options = {
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: false,
            startingTop: "4%",
            endingTop: "10%",
        };
        M.Modal.init(imageModal.current, options)
    }, [])

    const _submit = () => {
        updateAvartar(file)
    }
    return (
        <div>
            <div
                ref={imageModal}
                id="modal1"
                className="modal"
            >
                <div className="modal-content">
                    <span>Update your avartar</span>
                    <div className="file-field input-field">
                        <div className="btn">
                            <span>File</span>
                            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <a className="modal-close waves-effect waves-red btn-flat">
                        Disagree
                        </a>
                    <a className="modal-close waves-effect waves-green btn-flat" onClick={() => _submit()}>
                        Agree
                        </a>
                </div>
            </div>
        </div>
    );

}

export default Modal;
