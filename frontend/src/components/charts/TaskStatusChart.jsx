import {

    Chart as ChartJS,

    ArcElement,

    Tooltip,

    Legend

} from "chart.js";

import {

    Pie

} from "react-chartjs-2";

ChartJS.register(

    ArcElement,

    Tooltip,

    Legend

);

const TaskStatusChart = ({

    statistics

}) => {

    const data = {

        labels: [

            "Chưa thực hiện",

            "Đang thực hiện",

            "Hoàn thành"

        ],

        datasets: [

            {

                data: [

                    statistics.todo,

                    statistics.inProgress,

                    statistics.completed

                ]

            }

        ]

    };

    return <Pie data={data} />;

};

export default TaskStatusChart;