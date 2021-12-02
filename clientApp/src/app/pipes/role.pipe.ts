import { Pipe, PipeTransform } from "@angular/core";


@Pipe({name: 'role'})
export class RolePipe implements PipeTransform {
    transform(value: boolean): string {
        if(value){
            return "admin";
        }else{
            return "user";
        }
     
    }
}