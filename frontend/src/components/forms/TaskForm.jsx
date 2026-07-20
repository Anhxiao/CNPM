import { useState } from "react";

import Input from "../common/Input";
import Button from "../common/Button";

import taskService from "../../services/task.service";

const TaskForm = ({ projectId }) => {

    const [formData, setFormData] = useState({

        title: "",

        description: "",

        dueDate: ""

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await taskService.createTask({

                ...formData,

                projectId

            });

            alert("Thêm Task thành công");

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Có lỗi xảy ra"

            );

        }

    };

    return (

        <form onSubmit={handleSubmit}>

            <Input

                label="Tên Task"

                name="title"

                value={formData.title}

                onChange={handleChange}

            />

            <Input

                label="Mô tả"

                name="description"

                value={formData.description}

                onChange={handleChange}

            />

            <Input

                type="date"

                label="Hạn hoàn thành"

                name="dueDate"

                value={formData.dueDate}

                onChange={handleChange}

            />

            <Button type="submit">

                Lưu

            </Button>

        </form>

    );

};

export default TaskForm;