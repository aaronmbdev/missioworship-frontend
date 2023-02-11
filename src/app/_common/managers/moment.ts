import { formatDate } from '@angular/common';

export function moment(date?:Date):Moment{
    return new Moment(date);
}

export class Moment{
    private date:Date;
    constructor(date?:Date){
        this.date = date??new Date();
    }
    format(format:string):string{
        return formatDate(this.date,format,'en-US');
    }
    addDays(num:number):Moment{
        this.date.setDate(this.date.getDate()+num);
        return this;
    }
    setDate(num:number):Moment{
        this.date.setDate(num);
        return this;
    }
    addMonths(num:number):Moment{
        this.date.setMonth(this.date.getMonth()+num);
        return this;
    }
    setMonth(num:number):Moment{
        this.date.setMonth(num);
        return this;
    }
}