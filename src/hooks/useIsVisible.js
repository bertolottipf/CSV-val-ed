import { useState, useEffect } from 'react';

export function useIsVisible(ref) {
	const [isIntersecting, setIntersecting] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting)
		);

		observer.observe(ref.current);
		return () => {
			observer.disconnect();
		};
	}, [ref]);

	return isIntersecting;
}


/*
// How to use it
export function MyComponent() {
	const ref = useRef();
	const isVisible = useIsVisible(ref);

	return (
		<div ref={ref}>
			<p>{isVisible ? "Visible" : "Not visible"}</p>
		</div>
	);
}
*/