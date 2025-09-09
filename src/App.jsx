import { useState, useEffect, useRef } from "react";
import CounterContextProvider from "./utils/CounterContextProvider";
import { DateCounter } from "./components/DateCounter";
import { DaysCount } from "./components/DaysCount";
import { Loader } from "./components/Loader";
import { Footer } from "./components/Footer";
import styles from "./App.module.css";

export default function App() {
	const [isLoading, setIsLoading] = useState(true);
	const mainContentRef = useRef(null);

	useEffect(() => {
		// Simulate loading time for better UX
		const timer = setTimeout(() => {
			setIsLoading(false);
			// Focus on main content after loading
			if (mainContentRef.current) {
				mainContentRef.current.focus();
			}
		}, 3000); // 3 seconds loading time

		return () => clearTimeout(timer);
	}, []);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<CounterContextProvider>
			<a href="#main-content" className={styles.skipLink}>
				Skip to main content
			</a>
			<div
				className={styles.app}
				role="main"
				aria-label="Date Calculator Application"
			>
				<header>
					<h1 className={styles.appTitle} id="main-title">
						Date Calculator
					</h1>
				</header>
				<main
					id="main-content"
					aria-labelledby="main-title"
					ref={mainContentRef}
					tabIndex="-1"
				>
					<DateCounter />
					<DaysCount />
				</main>
			</div>
			<Footer />
		</CounterContextProvider>
	);
}
