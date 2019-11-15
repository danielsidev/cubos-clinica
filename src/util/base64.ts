export class Base64{
    private value: string;
    constructor(value){
        this.value = value;
    }
    public toBase64(): string{
        return new Buffer(this.value).toString('base64');
    }
    public fromBase64(): string{
        return new Buffer(this.value, 'base64').toString('ascii');
    }
}