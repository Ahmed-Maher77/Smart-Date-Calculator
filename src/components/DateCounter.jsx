// ========================
// Date Counter Component
// ========================

import { useCallback } from "react";
import { useCounterContext } from "../utils/CounterContextProvider";
import ButtonControl from "./ButtonControl";
import styles from  "../App.module.css";

export const DateCounter = () => {
	const { count, setCount, includeWeekends, setIncludeWeekends } =
		useCounterContext();

	// Memoized callbacks for better performance
	const handleChange = useCallback(
		(e) => {
			const value = Math.min(100, Math.max(-100, Number(e.target.value)));
			setCount(value);
		},
		[setCount]
	);

	const increase = useCallback(
		() => setCount((c) => Math.min(c + 1, 100)),
		[setCount]
	);
	const decrease = useCallback(
		() => setCount((c) => Math.max(c - 1, -100)),
		[setCount]
	);

	return (
		<form className={styles.dateCounter} onSubmit={(e) => e.preventDefault()}>
			{/* Range Input Section */}
			<section className={styles.rangeSection} aria-labelledby="days-label">
				<label id="days-label" htmlFor="days-counter">
					Days from today
				</label>
				<input
					type="range"
					id="days-counter"
					min={-100}
					max={100}
					value={count}
					onChange={handleChange}
					aria-describedby="days-description"
				/>
				<span id="days-description" className={styles.rangeValue}>
					{count} day{Math.abs(count) !== 1 && "s"}
				</span>
			</section>

			{/* Number Input Controls */}
			<section className={styles.inputSection}>
				<ButtonControl
					onClick={increase}
					disabled={count >= 100}
					label="Increase days"
					text="+"
				/>
				<input
					type="number"
					min={-100}
					max={100}
					value={count}
					onChange={handleChange}
					aria-label="Number of days to add/remove"
					className={styles.numberInput}
				/>
				<ButtonControl
					onClick={decrease}
					disabled={count <= -100}
					label="Decrease days"
					text="-"
				/>
			</section>

			{/* Settings Section */}
			<section className={styles.settingsSection}>
				<label>
					<input
						type="checkbox"
						checked={!includeWeekends}
						onChange={() => setIncludeWeekends(!includeWeekends)}
						aria-label="Exclude weekends from calculation"
					/>
					Exclude weekends
				</label>
			</section>

			{/* Reset Control */}
			<button
				className={styles.resetBtn}
				type="reset"
				onClick={() => setCount(0)}
				aria-label="Reset days to zero"
			>
				Reset
			</button>
		</form>
	);
};
