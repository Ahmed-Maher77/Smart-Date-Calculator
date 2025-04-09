import CounterContextProvider from "./utils/CounterContextProvider";
import { DateCounter } from "./components/DateCounter";
import {DaysCount} from "./components/DaysCount";
import styles from  "./App.module.css";

export default function App() {
	return (
		<CounterContextProvider>
			<div className={styles.app} role="main">
				<h1 className={styles.appTitle}>Date Calculator</h1>
				<DateCounter />
				<DaysCount />
			</div>
		</CounterContextProvider>
	);
}
