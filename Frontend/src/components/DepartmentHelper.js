import { useNavigate } from 'react-router-dom'
import './DepartmentHelper.css'
import axios from "axios";
 
 export const columns =[
    {
        name: "Dep No",
        selector:(row) => row.depno
    },

    {
        name: "Department Name",
        selector:(row) => row.dep_name
    },
    {
        name: "Action",
        selector:(row) => row.action
    }
]

export const DepartmentButtons = ({_id,onDepartmentDelete}) => {
    const navigate = useNavigate();

    const deleteHandler =async(id) =>{
        const confirm = window.confirm("Do you want to delete");
        if(confirm){
        try {
                const response = await axios.delete(`http://localhost:8070/Departments/${id}`);
                
                
                if (response.data.success) {
                 onDepartmentDelete(id)
                }
              } catch(error) {
                if(error.response && !error.response.data.success) {
                  alert(error.response.data.error);
                }
              }
            }

    }
    return(
        <div className="depbuttons">
            <button className="editdept" onClick={() => navigate(`/admin-dashboard/department/${_id}`)}>Edit</button>
            <button className="deletedept" onClick={() =>deleteHandler(_id)}>Delete</button>
        </div>
    )
}