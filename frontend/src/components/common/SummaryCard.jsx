const SummaryCard = ({
    title,
    value,
    icon,
    color = "#2563eb"
}) => {

    return (
        <div
            className="summary-card"
            style={{
                borderLeft: `6px solid ${color}`
            }}
        >
            <div className="summary-card-icon">

                {icon}

            </div>

            <div className="summary-card-content">

                <h4>{title}</h4>

                <h2>{value}</h2>

            </div>

        </div>
    );

};

export default SummaryCard;