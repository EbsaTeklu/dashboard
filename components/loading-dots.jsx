import styles from "./loading-dots.module.css";

const LoadingDots = ({ color = "#000" }) => {
  return (
    <div className={styles.loading}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </div>
  );
};

export default LoadingDots;
