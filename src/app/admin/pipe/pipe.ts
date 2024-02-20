import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'dateTimeFormat'
})

export class DateTimeFormatPipe implements PipeTransform{
    transform(value: string | Date  | undefined):string {
        if (!value) {
            return 'N/A'; 
          }
        if (typeof value === 'string') {
            return value;
        }
        if (value instanceof Date) {
            console.log("inside the method")
        const dataPipe = new DatePipe('en-US');
        console.log(dataPipe.transform(value,'short') || '');
        return dataPipe.transform(value,'short') || '';
        }
        return value;
        
    }
}