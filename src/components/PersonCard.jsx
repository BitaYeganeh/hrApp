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
        </div>
    );
};

export default PersonCard;