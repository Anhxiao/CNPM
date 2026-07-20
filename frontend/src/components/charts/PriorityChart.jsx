import {

    Chart as ChartJS,

    ArcElement,

    Tooltip,

    Legend

} from "chart.js";

import {

    Doughnut

} from "react-chartjs-2";

ChartJS.register(

    ArcElement,

    Tooltip,

    Legend

);

const PriorityChart = ({

    priority

}) => {

    const data = {

        labels: [

            "Thấp",

            "Trung bình",

            "Cao"

        ],

        datasets: [

            {

                data: [

                    priority.low,

                    priority.medium,

                    priority.high

                ]

            }

        ]

    };

    return (

        <Doughnut data={data} />

    );

};

export default PriorityChart;