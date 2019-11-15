import {ScheduleModel} from '../../model/schedule/schedule.model';
import { Schedule, Schedules, Intervals } from '../../model/interfaces/schedule.interface';
/**
 * Represents the controller that extends the model for schedules
 * @class ShceduleController
 */
export class ScheduleController extends ScheduleModel{
    public regra: [];    
    public id: number = 0 ;

    constructor(){
        super();
    }
    /**
     * Find all schedules available registered
     */
    public async getAllSchedules(){
        let listaRegras: [Schedule] = await this.getFullSchedules().then((response) => {return response;});
        return  listaRegras;
    }
    /**
     * Find a schedule fomr specifica date
     * @param {string}day 
     */
    public async findScheduleByDay(day: string ){
        if(day.length===10){
            let schedulesDay = await this.getScheduleByDay(day).then((response)=>{ return response});
            console.log(`schedulesDay: ${JSON.stringify(schedulesDay)}`);
            return schedulesDay;
        }else{
            throw new Error('invalid day');
        }

    }
    /**
     * Find a schedule from intervals date
     * @param {string} start 
     * @param {string} end 
     */
    public async findScheduleByDates(start , end){
            let schedulesDay = await this.getScheduleByDates(start, end).then((response)=>{ return response});
            console.log(`schedulesDay: ${JSON.stringify(schedulesDay)}`);
            return schedulesDay;

    }
    /**
     * Register a new schedule
     * @param {object: Schedule} newSchedule  
     */
    public async registerSchedule(newSchedule){
        let exist = false;   
        return new Promise((resolve, reject)=>{
            let scheduleRegisterd = null;
            if(newSchedule.hasOwnProperty("day") && newSchedule.hasOwnProperty("intervals") && newSchedule.hasOwnProperty("employee")  && newSchedule.hasOwnProperty("daily") && newSchedule.hasOwnProperty("weekly") && newSchedule.hasOwnProperty("week_days")){
                this.getSchedules().then(async (response: Schedules) => {       
                    
                    newSchedule.week_days = newSchedule.week_days.map((wd) =>{ return wd.toLowerCase();});  
                    newSchedule = {...{"id":response.sequence+1}, ...newSchedule};
                    this.allSchedules = response.schedules;
                    try {
                        exist = await this.verifySchedule(newSchedule);
                        this.allSchedules.push(newSchedule); 
                        let schedule= {'sequence':newSchedule.id, 'schedules':this.allSchedules};
                        scheduleRegisterd = await this.setSchedule(schedule)
                        .then((response) => {
                            resolve(response);
                        })
                        .catch((error) => {
                            console.error(error);
                            reject(error);
                        });
                    } catch (error) {
                        console.error(error);
                        reject('schedule unavailable');
                    }    
                });
            }
        });
        
    }
    /**
     * Verify days and hours for do not register duplicate
     * @param {object: Schedule} newSchedule  
     */
    public async verifySchedule(newSchedule): Promise<boolean>{
        return new Promise((resolve, reject)=>{
            this.allSchedules.map((as)=>{
                //specific day or daily
                if((as.day && as.day === newSchedule.day) || newSchedule.daily){
                    newSchedule.intervals.map((i)=>{
                        as.intervals.map((ai)=>{
                            if(i.start === ai.start || i.end === ai.end){
                                console.log('schedule unavailable: specific day or daily');
                                reject(true)
                            }
                        });
                    });
                }
                //consult in days of week
                if(newSchedule.weekly){
                    newSchedule.week_days.map((wd)=>{
                        if(as.week_days.includes(wd)){
                            newSchedule.intervals.map((i)=>{
                                as.intervals.map((ai)=>{
                                    if(i.start === ai.start || i.end === ai.end){
                                        console.log('schedule unavailable: consult in days of week');
                                        reject(true)
                                    }
                                });
                            });
                        }
                    });
                }
            });   
            resolve(false);         
        });

    }
    /**
     * Delete a schedule from id
     * @param {number }id 
     */
    public async deleteSchedule(id){
        let schedule = null;
        try{
            this.id = parseInt(id);
            if(this.id>0){
                schedule= await this.delScheduleById(this.id)
                .then((response) => {
                    return response;
                })
                .catch((error) => {
                    throw new Error(error);
                });
            }
            return schedule;
        }catch(e){
            throw new Error(e);
        }        
        
    }
    
}