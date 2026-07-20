import React from "react";

const ConfirmDialog = ({
    show,
    title,
    message,
    onConfirm,
    onCancel
}) => {

    if (!show) {

        return null;

    }

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h3>

                    {title}

                </h3>

                <p>

                    {message}

                </p>

                <button onClick={onConfirm}>

                    Đồng ý

                </button>

                <button onClick={onCancel}>

                    Hủy

                </button>

            </div>

        </div>

    );

};

export default ConfirmDialog;