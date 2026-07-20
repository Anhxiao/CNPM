import {

    Chart as ChartJS,

    CategoryScale,

    LinearScale,

    BarElement,

    Title,

    Tooltip,

    Legend

} from "chart.js";

import {

    Bar

} from "react-chartjs-2";

ChartJS.register(

    CategoryScale,

    LinearScale,

    BarElement,

    Title,

    Tooltip,

    Legend

);

const ProjectProgressChart = ({

    projects = []

}) => {

    const data = {

        labels: projects.map(

            project => project.name

        ),

        datasets: [

            {

                label: "Tiến độ (%)",

                data: projects.map(

                    project => project.progress

                )

            }

        ]

    };

    const options = {

        responsive: true,

        plugins: {

            legend: {

                position: "top"

            }

        }

    };

    return (

        <Bar

            data={data}

            options={options}

        />

    );

};

export default ProjectProgressChart;