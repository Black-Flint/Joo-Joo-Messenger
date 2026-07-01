import logixlysia, { resolveOptions } from "logixlysia";

type Service = "api" | "websocket" | "worker";

export const logger = (service: Service) => {
	const options = resolveOptions({
		config: {
			service, // Service name shown in every log entry

			// Startup
			showStartupMessage: false,
			startupMessageFormat: "simple",

			// Context
			showContextTree: process.env.NODE_ENV === "development",
			contextDepth: process.env.NODE_ENV === "development" ? 2 : 1,

			// Performance monitoring
			slowThreshold: 500,
			verySlowThreshold: 1000,

			// Timestamp format
			timestamp: {
				translateTime: "yyyy-mm-dd HH:MM:ss",
			},

			// Log output format
			customLogFormat:
				"{now} {service} {method} {pathname} {status} - {duration} {message}{speed}",

			// Request information
			ip: true,

			// Console colors
			useColors: process.env.NODE_ENV === "development",

			// File logging & rotation
			logFilePath: "./logs/app.log",
			logRotation: {
				maxSize: "10m", // Rotate when file reaches 10MB
				maxFiles: "7d", // Keep logs for 7 days
				compress: true, // Compress rotated logs
			},

			// Enabled log levels
			logFilter: {
				level:
					process.env.NODE_ENV === "development"
						? ["DEBUG", "INFO", "WARNING", "ERROR"]
						: ["INFO", "WARNING", "ERROR"],
			},
		},
	});

	return logixlysia(options);
};
