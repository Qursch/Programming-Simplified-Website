export default class Logger {
	public static log(message: string, ...args: any[]): void {
		console.log(message, ...args);
	}
	public static error(message: string, ...args: any[]): void {
		console.error(message, ...args);
	}
	public static warn(message: string, ...args: any[]): void {
		console.warn(message, ...args);
	}
}
