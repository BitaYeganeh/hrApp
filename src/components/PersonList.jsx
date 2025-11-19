import PersonCard from "./PersonCard";
import styles from "./PersonList.module.css";
import {calculateWorkExperience} from "../utils/calculateWorkExperience"



const PersonList = ({employees, updateEmployee}) => {

return (
    
    <div className={styles.listContainer}>
    {employees.map((employee) => (
        <PersonCard
            key={employee.id}
            {...employee}
            //name={employee.name}
            //title={employee.title}
            workExperience={calculateWorkExperience(employee.startDate)}
            //salary={employee.salary}
            //phone={employee.phone}
            //email={employee.email}
            //animal={employee.animal}
            //startDate={employee.startDate}
            //location={employee.location}
            //department={employee.department}
            //skills={employee.skills}
            updateEmployee={updateEmployee}
        />
    ))}
    </div>
);
};

export default PersonList;