import { useState } from "react";

import Input from "../common/Input";
import Button from "../common/Button";

import projectService from "../../services/project.service";

const ProjectForm = ({ onSuccess }) => {

    const [formData, setFormData] = useState({

        name: "",

        description: ""

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

            await projectService.createProject(formData);

            alert("Tạo Project thành công");

            onSuccess?.();

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

                label="Tên Project"

                name="name"

                value={formData.name}

                onChange={handleChange}

            />

            <Input

                label="Mô tả"

                name="description"

                value={formData.description}

                onChange={handleChange}

            />

            <Button type="submit">

                Lưu

            </Button>

        </form>

    );

};

export default ProjectForm;