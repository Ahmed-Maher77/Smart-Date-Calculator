// ========================
// Date Counter Component
// ========================

import { useCallback } from "react";
import { useCounterContext } from "../utils/CounterContextProvider";
import ButtonControl from "./ButtonControl";
import styles from "../App.module.css";

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

	// Keyboard navigation handler
	const handleKeyDown = useCallback(
		(e) => {
			if (e.key === "ArrowUp" || e.key === "ArrowRight") {
				e.preventDefault();
				increase();
			} else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
				e.preventDefault();
				decrease();
			}
		},
		[increase, decrease]
	);

	return (
		<form
			className={styles.dateCounter}
			onSubmit={(e) => e.preventDefault()}
		>
			{/* Range Input Section */}
			<fieldset className={styles.rangeSection}>
				<legend id="days-label">Days from today</legend>
				<input
					type="range"
					id="days-counter"
					min={-100}
					max={100}
					value={count}
					onChange={handleChange}
					aria-describedby="days-description"
					aria-label="Select number of days from today"
				/>
				<span id="days-description" className={styles.rangeValue}>
					{count} day{Math.abs(count) !== 1 && "s"}
				</span>
			</fieldset>

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
					onKeyDown={handleKeyDown}
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
			<fieldset className={styles.settingsSection}>
				<legend className="sr-only">Calculation settings</legend>
				<label htmlFor="exclude-weekends">
					<input
						id="exclude-weekends"
						type="checkbox"
						checked={!includeWeekends}
						onChange={() => setIncludeWeekends(!includeWeekends)}
						aria-describedby="weekends-description"
					/>
					Exclude weekends
				</label>
				<span
					id="weekends-description"
					className={`${styles.weekendsDescription} sr-only`}
				>
					When checked, weekends (Saturday and Sunday) will be
					excluded from the date calculation
				</span>
			</fieldset>

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
