import winston from "winston";
import path from "path";

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json(),
);

const logger = winston.createLogger({
  level: "info",
  format: logFormat,
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, "../db/logs/api.log"),
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),

    new winston.transports.File({
      filename: path.join(__dirname, "../db/logs/error.log"),
      level: "error",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
  );
}

export default logger;
