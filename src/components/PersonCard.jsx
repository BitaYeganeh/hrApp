import styles from "./PersonCard.module.css";
import {getAnimalEmoji} from "../utils/animalEmoji"
const PersonCard = (
    {
        name,
        title,
        workExperience,
        salary,
        phone,
        email,
        animal,
        startDate,
        location,
        department,
        skills
    }
) => {

    return (
        <div className={styles.person}>
        <div className={styles.name}>{name}</div>
        <div className={styles.title}>Title: {title}</div>
        <div className={styles.workExperience}>
            Work Experience:
            {workExperience.years > 0 && ` ${workExperience.years} year${workExperience.years > 1 ? "s" : ""}`}
            {workExperience.months > 0 && ` ${workExperience.months} month${workExperience.months > 1 ? "s" : ""}`}
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
        </div>
            
        <div className={styles.salary}>Salary: {salary}</div>
        <div className={styles.phone}>Phone :{phone}</div>
        <div className={styles.email}>Email: {email}</div>
        <div className={styles.animal}>Favorite Animal: {getAnimalEmoji(animal)}</div>
        <div className={styles.startDate}>Start Date: {startDate}</div>
        <div className={styles.location}>Location: {location}</div>
        <div className={styles.department}>Department: {department}</div>
        <div className={styles.skills}>Skills: {skills && skills.join(", ")}</div>
        </div>
    );
};

export default PersonCard;