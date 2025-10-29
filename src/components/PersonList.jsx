import PersonCard from "./PersonCard";
import React from "react";
import {employees} from "./employees";
import {calculateWorkExperience} from "../utils/calculateWorkExperience"

const PersonList = () => {

return (
    
    <div>
    {employees.map((employee) => (
        <PersonCard
            key={employee.id}
            name={employee.name}
            title={employee.title}
            workExperience={calculateWorkExperience(employee.startDate)}
            salary={employee.salary}
            phone={employee.phone}
            email={employee.email}
            animal={employee.animal}
            startDate={employee.startDate}
            location={employee.location}
            department={employee.department}
            skills={employee.skills}
        />
    ))}
    </div>
);
};

export default PersonList;