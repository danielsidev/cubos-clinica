export interface Schedule{
    id: number,
    employee: string,
    day? :string,
    weekly:boolean,
    week_days:[string],
    daily:boolean,
    intervals: [Intervals]
}

export interface Schedules{
    sequence: number,
    schedules: [Schedule]

}

export interface Intervals{
    start: string,
    end: string
}
