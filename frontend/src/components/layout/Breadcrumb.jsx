import { Link } from "react-router-dom";

const Breadcrumb = ({
    items = []
}) => {

    return (

        <div className="breadcrumb">

            {

                items.map((item, index) => (

                    <span key={index}>

                        {

                            item.path

                                ? (

                                    <Link to={item.path}>

                                        {item.label}

                                    </Link>

                                )

                                : (

                                    item.label

                                )

                        }

                        {

                            index < items.length - 1

                            && " / "

                        }

                    </span>

                ))

            }

        </div>

    );

};

export default Breadcrumb;