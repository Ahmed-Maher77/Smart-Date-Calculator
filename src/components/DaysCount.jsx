import { memo, useMemo } from "react";
import { useCounterContext } from "../utils/CounterContextProvider";
import styles from  "../App.module.css";

export const DaysCount = () => {
	const { count, includeWeekends } = useCounterContext();

	// Memoize date calculation for better performance
	const futureDate = useMemo(() => {
		const startDate = new Date();
		let daysRemaining = count;
		let currentDate = new Date(startDate);

		if (includeWeekends) {
			currentDate.setDate(currentDate.getDate() + count);
		} else {
			// Optimized weekend calculation logic
			const direction = daysRemaining > 0 ? 1 : -1;
			while (daysRemaining !== 0) {
				currentDate.setDate(currentDate.getDate() + direction);
				if (currentDate.getDay() % 6 !== 0) {
					// 0=Sunday, 6=Saturday
					daysRemaining -= direction;
				}
			}
		}

		return currentDate.toLocaleDateString("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	}, [count, includeWeekends]);

	return (
		<div className={styles.dateDisplay}>
			<p>
				{count >= 0 ? "Future" : "Past"} Date:{" "}
				<strong className={styles.dateValue}>{futureDate}</strong>
			</p>
			<p className={styles.timezoneNotice}>
				Dates are calculated based on your local time zone
			</p>
		</div>
	);
};

const MemoizedDaysCount = memo(DaysCount);
