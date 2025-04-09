import { memo } from "react";

const ButtonControl = memo(({ onClick, disabled, label, text }) => (
	<button onClick={onClick} disabled={disabled} aria-label={label}>
		{text}
	</button>
));

export default ButtonControl;