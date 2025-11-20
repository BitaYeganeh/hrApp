import styles from "./PersonCard.module.css";
import {getAnimalEmoji} from "../utils/animalEmoji"
import { useState, useEffect } from "react";
import axios from "axios";
import { calculateWorkExperience } from "../utils/calculateWorkExperience";


const PersonCard = ({
        id,
        name,
        title,
        //workExperience,
        salary,
        phone,
        email,
        animal,
        startDate,
        location,
        department,
        skills,
        updateEmployee
}) => {


 // EDIT MODE STATE
const [isEditing, setIsEditing] = useState(false);

//FORM DATA STATE
const [formData, setFormData] = useState({
    salary: salary || "",
    location: location || "",
    department: department || "",
    skills: skills ? skills.join(", ") : "",
});

const [savedMessage, setSavedMessage] = useState("");

// Calculate work experience
  const workExperience = calculateWorkExperience(startDate);

// Sync formData with props when they change
useEffect(() => {
    setFormData({
        salary: salary || "",
        location: location || "",
        department: department || "",
        skills: skills ? skills.join(", ") : "",
    });
}, [salary, location, department, skills]);



  // Handle input changes
const handleChange = (e) => {
    setFormData((prevState) => {
        return { ...prevState, [e.target.name]: e.target.value };
    });
};

//add toggleEdit function
const toggleEdit = () => {
    setIsEditing(!isEditing);
};

//add handleSave function
const handleSave = () => {
    const updatedEmployee = {
        id,
        name,
        title,
        //workExperience,
        phone,
        email,
        animal,
        startDate,
        salary: formData.salary,
        location: formData.location,
        department: formData.department,
        skills: formData.skills.split(",").map((skill) => skill.trim()),
    };

    axios
    .put(`http://localhost:3001/employees/${id}`, updatedEmployee)
    .then((response) => {
        updateEmployee(response.data); //UPDATE LOCAL STATE IN APP.JSX
        setIsEditing(false); //EXIT EDIT MODE
        setSavedMessage("Changes saved!");

        // Clear the saved message after 2 seconds
        setTimeout(() => setSavedMessage(""), 2000);
    })   

    .catch((error) => {
        console.error("Error: ", error.message);

    });
};




//EDIT MODE VIEW:

if (isEditing) {
    return (
        <div className={styles.person}>
            <label>Salary:</label>
            <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
            />

            <label>Location:</label>
            <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
            />

            <label>Department:</label>
            <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
            />

            <label>Skills (comma separated):</label>
            <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
            />

            <button onClick={toggleEdit}>Cancel</button>
            <button onClick={handleSave}>Save</button>
        </div>
        );
    }

    // DISPLAY NORMAL MODE VIEW:
       return (
        
            <div className={styles.person}>


            {savedMessage && <div className={styles.savedMessage}>{savedMessage}</div>} 
            
            {/* add message for 5.10.15 years */}
            {workExperience.years > 0 && workExperience.years % 5 === 0 && (
            <div className={styles.reminder}>
                 🎉 Schedule recognition meeting 🎉
            </div>
            )}
          
            {/* add msg for less than 6 months experience */}
            {workExperience.years === 0 && workExperience.months < 6 && (
            <div className={styles.reminder}>
                 🔔 Schedule probation review 🔔
            </div>
            )}
            {/* name and title on same line */}
            <div className={styles.headerRow}>
            <div className={styles.name}>
            <span className={styles.animalIcon}>{getAnimalEmoji(animal)}</span> {name} <span className={styles.title}>({title})</span>
            </div>
            </div>

            <div className={styles.headerRow}>
            <div className={styles.department}>Department: {department}</div>
            <div className={styles.salary}>Salary: {salary}</div>
            </div>

            <div className={styles.infoRow}>
            <div className={styles.email}>Email: {email}</div>
            <div className={styles.phone}>Phone :{phone}</div>
             <div className={styles.location}>Location: {location}</div>
            </div>

            <div className={styles.startDate}>Start Date: {startDate}</div>
            <div className={styles.workExperience}>
            Work Experience:
            {workExperience.years > 0 && ` ${workExperience.years} year${workExperience.years > 1 ? "s" : ""}`}
            {workExperience.months > 0 && ` ${workExperience.months} month${workExperience.months > 1 ? "s" : ""}`}
            </div>

            <div className={styles.skillsSection}>
            <div className={styles.skillsLabel}></div>
            <div className={styles.skillsList}>
                 {skills && skills.map((skill, index) => (
            <span key={index} className={styles.skillBox}>{skill}</span>
            ))}

            </div>
            </div>

            <button onClick={toggleEdit} className={styles.editButton}>Edit</button>
            </div>
            );
            };

export default PersonCard;