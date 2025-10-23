import styles from "./Person.module.css";

const Person = (props) => {
    return (
        <div className={styles.person}>
        <div className={styles.name}>{props.name}</div>
        <div className={styles.title}>Title: {props.title}</div>
        <div className={styles.salary}>Salary: {props.salary}</div>
        <div className={styles.phone}>Phone :{props.phone}</div>
        <div className={styles.email}>Email: {props.email}</div>
        <div className={styles.animal}>Favorite Animal: {props.animal}</div>
        </div>
    );
};

export default Person;