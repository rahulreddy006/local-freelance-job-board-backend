import winston from "winston";

const logger = winston.createLogger(
    {
   level:"info",
   format:winston.format.combine(winston.format.colorize(),
winston.format.timestamp(),
winston.format.simple()),
   transports:[
  new winston.transports.File({
    filename:"src/logs/error.log",
    level:"error"
  }),
  new winston.transports.File({
    filename:"src/logs/combined.log"
  }),
  new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
]
}
);

export default logger;
