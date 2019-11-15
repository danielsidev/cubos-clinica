import { ScheduleController } from '../../controller/schedule/schedule.controller';
import { Request, Response, NextFunction } from "express-serve-static-core";
/**
* Represents  a class of business for the schedule routes
* @class ScheduleBusiness
*/
export class ScheduleBusiness{

    constructor(){}
    /**
     * Represent the business method for the route Find all schedules
     * @name get /schedules/all
     * @param req {express.Request} The request.
     * @param res {express.Response} The response.
     */
    public async findSchedules(req:Request, res:Response){
                let find = new ScheduleController();
                let list =  await find.getAllSchedules();
                if(list){
                    res.status(200).json({success:true, list:list});
                }else{
                    res.status(400).json({success:false, list:[]});
                }
    }
    /**
     * Represent the business method for the route Find schedules from specific day
     * @name get /schedules/day/:day
     * @param req {express.Request} The request.
     * @param res {express.Response} The response.
     * @param req.params.day {String} - The date YYYY-MM-DD.
     */
    public async findSchedulesDay(req:Request, res:Response){
        let find = new ScheduleController();
        let list= null; 
        try {
            list = await find.findScheduleByDay(req.params.day);
            res.status(200).json({success:true, list:list, error: null});
        } catch (error) {
            res.status(400).json({success:false, list:[], error: error});
        }
                    
    }
    /**
     * Represent the business method for the route Find schedules from intervals date
     * @name get /schedules/dates/intervals
     * @param req {express.Request} The request.
     * @param res {express.Response} The response.
     * @param req.headers.start {String} - The start date YYYY-MM-DD.
     * @param req.headers.end {String} - The end date YYYY-MM-DD.
     */
    public async findSchedulesDates(req:Request, res:Response){
        let find = new ScheduleController();
        let list= null; 
        try {
            let start = req.headers.start;
            let end   = req.headers.end; 
            list = await find.findScheduleByDates(start, end);
            res.status(200).json({success:true, list:list, error: null});
        } catch (error) {
            res.status(400).json({success:false, list:[], error: error});
        }
                    
    }
    /**
     * Represent the business method for the route Register a new schedule
     * @name post /schedule
     * @param req {express.Request} The request.
     * @param res {express.Response} The response.
     * @param req.body {Object: Schedule} The JSON payload.
     * @param req.body.employee {string } - Name of employee - Examples:Dr. Gustavo, Dra. Silava, Dra. Cris
     * @param req.body.day {string} - Date available -   Can be: null or date format YYY-MM-DD
     * @param req.body.weekly {boolean} - Weeky type's available -   Can be: false or true
     * @param req.body.week_days {Array<string>} - Days of week available -   Can be: ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"]
     * @param req.body.daily {boolean} - Daily type's available -   Can be: false or true
     * @param req.body.intervals {Array<Intervals>} - Intervals type's available -   Can be: [{ "start": "13:15", "end": "13:45" }, { "start": "14:00", "end": "14:30" }]
     */    
    public async setRegisterSchedule(req:Request, res:Response){
        let sch = new ScheduleController();
        try {
            let result = await sch.registerSchedule(req.body);
                console.log(`result: ${JSON.stringify(result)}` );
                res.status(200).json({success:true,  error: null});     
        } catch (error) {
            res.status(400).json({success:false, error: error});
        }
    }
    /**
     * Represent the business method for the route Delete a schedule from id
     * @name delete schedule/:id
     * @param req {express.Request} The request.
     * @param res {express.Response} The response.
     * @param req.params.id {number} id - Id from schedule.
     */    
    public async removeSchedule(req:Request, res:Response){
        let sch = new ScheduleController();
        try {
            let id: number = parseInt(req.params.id);
            sch.delScheduleById(id);
            res.status(200).json({success:true,  error: null});     
        } catch (error) {
            res.status(400).json({success:false, error: error});
        }
    }
}