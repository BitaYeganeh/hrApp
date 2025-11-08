import styles from "./AddEmployee.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = ({formData, setFormData, onAddEmployee }) => {
const navigate = useNavigate();
const handleChange = (e) => {
setFormData((prevState) => {
    return {...prevState, [e.target.name]: e.target.value}
});
   
};
const handleSubmit = (e) => {
e.preventDefault();

//BUILD NEW EMPLOYEE OBJECT:
const newEmployee = {
    id: Date.now(), // CREATE A UNIQUE ID
    ...formData,
    skills:formData.skills.split(",").map(skill => skill.trim())
};

onAddEmployee(newEmployee); //PASS THE NEW EMPLOYEE TO THE PARENT

//RESET FORM
setFormData({
    name:"",
    title:"",
    salary:"",
    phone:"",
    email:"",
    animal:"",
    startDate:"",
    location:"",
    department:"",
    skills:"",

});

alert("Employee added successfully!");
navigate("/"); //REDIRECT TO THE MAIN PAGE (HOME) AFTER ADDING A NEW EMPLOYEE
};


return (
    <div className={styles.Container}>
        <h2 className={styles.heading}>Add New Person</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
            <div>
            <label htmlFor="name">Name:</label>
            <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
            />
            </div>
            
            <div>
            <label htmlFor="title">Title:</label>
            <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
            />
            </div>

            <div>
            <label htmlFor="salary">Salary:</label>
            <input
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
            />
            </div>

            <div>
            <label htmlFor="phone">Phone:</label>
            <input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
            />
            </div>

            <div>
            <label htmlFor="email">Email:</label>
            <input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            </div>

            <div>
            <label htmlFor="animal">Animal:</label>
            <input
                id="animal"
                name="animal"
                value={formData.animal}
                onChange={handleChange}
            />
            </div>

            <div>
            <label htmlFor="startDate">StartDate:</label>
            <input
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
            />
            </div>

            <div>
            <label htmlFor="location">Location:</label>
            <input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
            />
            </div>


            <div>
            <label htmlFor="department">Department:</label>
            <input
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
            />
            </div>

            <div>
            <label htmlFor="skills">Skills:</label>
            <input
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
            />
            </div>
       

            <button 
               type="submit"
               className={styles.button}
               >Add Employee</button>
         </form>
        

    </div>
);
   
}

export default AddEmployee;