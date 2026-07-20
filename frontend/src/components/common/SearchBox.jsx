import React from "react";

const SearchBox = ({
    value,
    onChange,
    placeholder = "Tìm kiếm..."
}) => {

    return (

        <input

            type="text"

            value={value}

            onChange={onChange}

            placeholder={placeholder}

        />

    );

};

export default SearchBox;