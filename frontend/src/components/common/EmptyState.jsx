import React from "react";

const EmptyState = ({
    message = "Không có dữ liệu."
}) => {

    return (

        <div className="empty-state">

            <p>

                {message}

            </p>

        </div>

    );

};

export default EmptyState;