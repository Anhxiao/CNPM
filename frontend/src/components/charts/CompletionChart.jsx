import {

    Chart as ChartJS,

    RadialLinearScale,

    ArcElement,

    Tooltip,

    Legend

} from "chart.js";

import {

    PolarArea

} from "react-chartjs-2";

ChartJS.register(

    RadialLinearScale,

    ArcElement,

    Tooltip,

    Legend

);

const CompletionChart = ({

    completed,

    remaining

}) => {

    const data = {

        labels: [

            "Hoàn thành",

            "Còn lại"

        ],

        datasets: [

            {

                data: [

                    completed,

                    remaining

                ]

            }

        ]

    };

    return (

        <PolarArea

            data={data}

        />

    );

};

export default CompletionChart;