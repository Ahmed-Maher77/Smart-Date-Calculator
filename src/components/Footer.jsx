import styles from "./Footer.module.css";

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer
			className={styles.footer}
			role="contentinfo"
			aria-label="Footer"
		>
			<div className={styles.footerContent}>
				<p className={styles.copyright}>© {currentYear} Ahmed Maher</p>
				<a
					href="https://ahmedmaher-portfolio.vercel.app"
					target="_blank"
					rel="noopener noreferrer"
					className={styles.portfolioLink}
					aria-label="Visit Ahmed Maher's portfolio (opens in new tab)"
				>
					Portfolio
				</a>
			</div>
		</footer>
	);
}
