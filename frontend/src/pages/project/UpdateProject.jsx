import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import projectService from "../../services/project.service";
import Loading from "../../components/common/Loading";

const UpdateProject = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({

        name: "",

        description: "",

        status: "Planning",

        startDate: "",

        endDate: ""

    });

    useEffect(() => {

        loadProject();

    }, []);

    const loadProject = async () => {

        try {

            const response = await projectService.getProject(id);

            const project = response.data.data;

            setFormData({

                name: project.name || "",

                description: project.description || "",

                status: project.status || "Planning",

                startDate: project.startDate
                    ? project.startDate.substring(0,10)
                    : "",

                endDate: project.endDate
                    ? project.endDate.substring(0,10)
                    : ""

            });

        }

        catch (error) {

            console.error(error);

            alert(

                error.response?.data?.message ||

                "Không thể tải Project."

            );

            navigate("/projects");

        }

        finally {

            setLoading(false);

        }

    };

    const handleChange = (e)=>{

        setFormData({

            ...formData,

            [e.target.name]:e.target.value

        });

    };

    const handleSubmit = async(e)=>{

        e.preventDefault();

        setSaving(true);

        try{

            await projectService.updateProject(id,formData);

            alert("Cập nhật thành công.");

            navigate("/projects");

        }

        catch(error){

            console.error(error);

            alert(

                error.response?.data?.message ||

                "Không thể cập nhật."

            );

        }

        finally{

            setSaving(false);

        }

    };

    if(loading){

        return <Loading/>;

    }

    return (

        <CreateProjectForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            saving={saving}
            navigate={navigate}
        />

    );

};

export default UpdateProject;