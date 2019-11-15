
import * as appRoot from 'app-root-path';
import {Helper}  from '../../util/helper';
import { Schedule, Schedules } from 'model/interfaces/schedule.interface';
import * as moment from 'moment';
/**
 * Represents the model for schedules
 * @class ShceduleModel
 */
export class ScheduleModel extends Helper {
    public filename:string ;
    
    public allSchedules : Array<Schedule> ;
    public schedulesDay : Array<Schedule> ;
    public schedulesDays: Array<Schedule> ;
    /**
     * Represents a Schedule
     * @constructor 
     */
    constructor(){
        super();
        this.filename      = `${appRoot}/src/model/data/schedules.json`;
        this.schedulesDay  = [];
        this.schedulesDays = [];
        this.allSchedules  = [];
    }
    /**
     * Get all schedules registerd with object complete
     * @return {Promise<Schedules>}
     */
    public getSchedules(): Promise<Schedules>{
        return new Promise((resolve, reject) =>{
            this.loadJSONFile(this.filename)
            .then((response:Schedules)=>{
                resolve(response);
            })
            .catch((error)=>{
                reject(error);
            });
        });
    } 
    /**
     * Get all schedules registerd with only list of schedules
     * @return {Promise<Schedules>}
     */
    public getFullSchedules(): Promise<[Schedule]>{
        return new Promise((resolve, reject) =>{
            this.getSchedules()
            .then((response: Schedules) => {            
                resolve(response.schedules);
            }).catch((error)=>{
                reject(error);
            });
        });
    }
    /**
     * Get schedules from specif date
     * @param {string} day
     * @return  Promise<Array<Schedule>>
     */
    public getScheduleByDay(day: string ): Promise<Array<Schedule>>{
        return new Promise((resolve, reject) =>{
            this.loadJSONFile(this.filename)
            .then((response:Schedules)=>{
                response.schedules.map(async (r: Schedule) => {
                    if(r.day==day){
                        this.schedulesDay.push(r);
                    }
                }); 
                resolve(this.schedulesDay);
            })
            .catch((error)=>{
                reject(error);
            });
        });
    }
    /**
     * Get schedules from intervals date
     * @param {string} start 
     * @param {string} end 
     * @return  Promise<Array<Schedule>>
     */
    public getScheduleByDates(start, end): Promise<Array<Schedule>>{

        return new Promise((resolve, reject) =>{
            this.loadJSONFile(this.filename)
            .then((response:Schedules)=>{
                response.schedules.map((r: Schedule) => {
                    //Interval of dates
                    if(moment(r.day).isBetween(start, end)){
                        this.schedulesDays.push(r);   
                    }
                    //Days of week
                    if(r.week_days.includes(this.getDayOfWeek(start)) || r.week_days.includes(this.getDayOfWeek(end)) ){
                        this.schedulesDays.push(r);   
                    }
                    //Daily
                    if(r.daily){
                        this.schedulesDays.push(r);   
                    }
                });
                resolve(this.schedulesDays);
            })
            .catch((error)=>{
                reject(error);
            });
        });
    }
    /**
     * Method for to return the day of week
     * @param {string} data  - YYY-MM-DD
     * @return {string} week day
     */
    public getDayOfWeek(data){
        if(data){
            let week = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
            let dt = data.split('-');
            let dateSearch = new Date(dt[0], dt[1], dt[0]);
            let day = dateSearch.getDay();
            return week[day];
        }else{
            return null;
        }

    }
    /**
     * Set a new schedule
     * @param {object: Schedule}newSchedule
     * @return {Promise<any | boolean>} 
     */
    public setSchedule(newSchedule): Promise<any | boolean> {
        return new Promise((resolve, reject) =>{
            return this.writeJSONFile(this.filename, newSchedule)
            .then(write => {
                resolve(write);
            }).catch(error => {
                reject(error);
            });      
        });
    }
    /**
     * Delete a schedule from JSON file from id
     * @param {number} id 
     * @return {Promise<any | boolean>} 
     */
    public delScheduleById(id: number) {
        return new Promise((resolve, reject) =>{
            this.loadJSONFile(this.filename)
            .then((response:Schedules)=>{
                response.schedules.map((r: Schedule) => {
                    if(r.id !== id){
                    this.allSchedules.push(r);
                    }
                });
                let schedule = {sequence:response.sequence, schedules:this.allSchedules};
                return this.writeJSONFile(this.filename, schedule)
                .then(write => {
                    resolve(write);
                }).catch(error => {
                    reject(error);
                });  
            })
            .catch((error)=>{
                reject(error);
            });
        });       

    }
}