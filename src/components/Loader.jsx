import styles from "./Loader.module.css";

export function Loader() {
	return (
		<div
			className={styles.loaderContainer}
			role="status"
			aria-live="polite"
			aria-label="Loading application"
		>
			<div className={styles.loader}>
				<div className={styles.spinner} aria-hidden="true"></div>
				<div
					className={styles.loadingText}
					aria-label="Loading Date Calculator application"
				>
					Loading Date Calculator...
				</div>
			</div>
		</div>
	);
}
