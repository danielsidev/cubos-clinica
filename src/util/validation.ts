export class Validation{
    private invalidValues: Array<any> = [null, undefined, "", "null", "undefined"];
    private values: Array<any> = [];
    constructor(){

    }


    public  existInvalidValues(values:Array<any>): boolean{
        if(values && values.length > 0){
            values.map(value => {
                if(this.invalidValues.includes(value))
                    return this.invalidValues.includes(value);
            });
        }else{
            if(this.invalidValues.includes(values))
            return this.invalidValues.includes(values);
        }

        return false;
    }
}