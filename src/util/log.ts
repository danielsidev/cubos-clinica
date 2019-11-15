//const appRoot = require('app-root-path');
import * as appRoot from 'app-root-path';
const winston = require('winston');

export class Log{
    private static options: any  = {
        fileInfo: {
            level: 'info',
            filename: `${appRoot}/logs/info.log`,
            handleExceptions: true,
            json: true,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            timestamp: true,
            colorize: true,
          },
          fileError: {
            level: 'error',
            filename: `${appRoot}/logs/error.log`,
            handleExceptions: true,
            json: true,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            colorize: true,
          }          ,
          console: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.align(),
            winston.format.printf((info) => {
              const {
                timestamp, level, message, ...args
              } = info;
              const ts = timestamp.slice(0, 19).replace('T', ' ');
              const lv = level.replace('[32m','').replace('[39m','');
              return `${ts} [ ${lv} ] : ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
            }),
          )
    };
    private static loggerInfo(){        
        return winston.createLogger({
            level: 'info',
            format: this.options.console, //winston.format.json(),
            prettyPrint:(object) => { return JSON.stringify(object);},
            transports: [
            new winston.transports.File(this.options.fileInfo),
            new winston.transports.Console()          
//            new winston.transports.Console(this.options.console)
            ]
        });
    } 
    private static loggerError(){
        return winston.createLogger({
            level: 'error',
            format: this.options.console, //winston.format.json(),
            prettyPrint:(object) => { return JSON.stringify(object);},
            transports: [
            new winston.transports.File(this.options.fileError),
            //new winston.transports.Console(this.options.console)
            ]
        });
    } 
    public static success(label, message){
        this.loggerInfo().log({
            level: 'info',
            label: label,
            message: message
        });
    }
    public static error(label, message){
        this.loggerError().log({
            level: 'error',
            label: label,
            message: message
        });
    }
}

