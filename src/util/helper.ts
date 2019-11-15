import * as fs from 'fs';
export class Helper {
    public data: Object;
    constructor(){}
    public getNewId(list: Array<any>){
        if (list.length > 0) {
            return list[list.length - 1].id + 1;
        } else {
            return 1;
        }
    }
    public newDate(){
        return new Date().toString();
    }
    public mustBeInArray(list: Array<any>, id: Number) {
        return new Promise((resolve, reject) => {
            const row = list.find(r => r.id == id)
            if (!row) {
                reject({
                    message: 'ID is not good',
                    status: 404
                })
            }
            resolve(row)
        })
    }
    public loadJSONFile(filename: string) {
        return new Promise((resolve, reject) => {
        fs.readFile(filename,'utf8', (err, data) => {
                if (err){
                    reject(err);
                }else{                    
                    resolve(JSON.parse(data));
                }
            });
        });
    }
    public writeJSONFile(filename: string, content: any): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try{
                fs.writeFileSync(filename, JSON.stringify(content), 'utf8');
                resolve(true);
            }catch(e){
                console.log(`Error writeJSONFile: ${JSON.stringify(e)}`);
                reject(e);
            }
        });
        
    }
}
