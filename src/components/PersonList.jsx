import PersonCard from "./PersonCard";
import styles from "./PersonList.module.css";
import { calculateWorkExperience } from "../utils/calculateWorkExperience";

const PersonList = ({ employees, updateEmployee }) => {
  return (
    <div className={styles.listContainer}>
      {employees.map((employee) => (
        <PersonCard
          key={employee.id}
          {...employee}
          workExperience={calculateWorkExperience(employee.startDate)}
          updateEmployee={updateEmployee}
        />
      ))}
    </div>
  );
};

export default PersonList;
