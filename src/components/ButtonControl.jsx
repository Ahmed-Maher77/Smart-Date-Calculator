import { memo } from "react";

const ButtonControl = memo(({ onClick, disabled, label, text }) => (
	<button
		onClick={onClick}
		disabled={disabled}
		aria-label={label}
		aria-describedby={disabled ? `${label}-disabled` : undefined}
	>
		{text}
		{disabled && (
			<span id={`${label}-disabled`} className="sr-only">
				This button is disabled because the limit has been reached
			</span>
		)}
	</button>
));

export default ButtonControl;
