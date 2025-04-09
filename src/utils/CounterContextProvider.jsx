// ========================
// Context Setup
// ========================

import { createContext } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useMemo } from "react";

export const CounterContext = createContext(null);

const CounterContextProvider = ({ children }) => {
	const [count, setCount] = useState(0);
	const [includeWeekends, setIncludeWeekends] = useState(true);

	// Memoize context value to prevent unnecessary re-renders
	const value = useMemo(
		() => ({
			count,
			setCount,
			includeWeekends,
			setIncludeWeekends,
		}),
		[count, includeWeekends]
	);

	return (
		<CounterContext.Provider value={value}>{children}</CounterContext.Provider>
	);
};

export default CounterContextProvider;

export const useCounterContext = () => useContext(CounterContext);
