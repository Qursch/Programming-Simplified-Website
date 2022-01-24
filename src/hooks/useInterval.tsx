import { useEffect, useRef } from "react";

export default function useInterval(callback, delay: number) {
	const savedCallback: any = useRef();

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		if (delay) {
			const id = setInterval(() => savedCallback.current(), delay);
			return () => {
				clearInterval(id);
			};
		}
	}, [delay]);
}
