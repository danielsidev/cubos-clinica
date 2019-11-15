import {Request, Response, Application} from "express";
import {ScheduleBusiness} from '../business/schedule/index';

export class Register {
    public app: Application;
    public sb: ScheduleBusiness;

    constructor(app: Application) { 
        this.app = app;
        this.sb = new ScheduleBusiness();
    }
    public setRoutes() {
        this.app.get( "/", ( req: Request, res: Response ) => res.render( "index" ) );
        this.app.get( "/schedules/all", this.sb.findSchedules);
        this.app.get( "/schedules/day/:day", this.sb.findSchedulesDay);
        this.app.get( "/schedules/dates/intervals", this.sb.findSchedulesDates);
        this.app.post( "/schedule", this.sb.setRegisterSchedule);
        this.app.delete( "/schedule/:id", this.sb.removeSchedule);
    }
}
