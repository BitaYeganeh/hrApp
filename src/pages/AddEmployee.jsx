import styles from "./pages/AddEmployee.module.css";

const AddEmployee = ({employeeData, setEmployeeData, handleClick}) => {

const handleChange = (e) => {
setEmployeeData((prevState) => {
    return {...prevState, [e.target.name]: e.target.value}
});
   
};
const handleSubmit = (e) => {
e.preventDefault();
handleClick();
setEmployeeData({
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
};

return (
    <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>

            <label htmlFor="name">Name:</label>
            <input
                id="name"
                name="name"
                value={employeeData.name}
                onChange={handleChange}
            />

            <label htmlFor="title">Title:</label>
            <input
                id="title"
                name="title"
                value={employeeData.title}
                onChange={handleChange}
            />

            <label htmlFor="salary">Salary:€</label>
            <input
                id="salary"
                name="salary"
                value={employeeData.salary}
                onChange={handleChange}
            />

            <label htmlFor="phone">Phone:</label>
            <input
                id="phone"
                name="phone"
                value={employeeData.phone}
                onChange={handleChange}
            />

            <label htmlFor="email">Email:</label>
            <input
                id="email"
                name="email"
                value={employeeData.email}
                onChange={handleChange}
            />

            <label htmlFor="animal">Animal:</label>
            <input
                id="animal"
                name="animal"
                value={employeeData.animal}
                onChange={handleChange}
            />

            <label htmlFor="startDate">StartDate:</label>
            <input
                id="startDate"
                name="startDate"
                value={employeeData.startDate}
                onChange={handleChange}
            />

            <label htmlFor="location">Location:</label>
            <input
                id="location"
                name="location"
                value={employeeData.location}
                onChange={handleChange}
            />

            <label htmlFor="department">Department:</label>
            <input
                id="department"
                name="department"
                value={employeeData.department}
                onChange={handleChange}
            />

            <label htmlFor="skills">Skills:</label>
            <input
                id="skills"
                name="skills"
                value={employeeData.skills}
                onChange={handleChange}
            />

            <button 
               type="submit"
               className='button'
               >Add Employee</button>

        </form>

    </div>
);
   
}

export default AddEmployee;