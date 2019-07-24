import { AbstractControl, ValidatorFn } from '@angular/forms';

export function userNameValidator(control: AbstractControl):{[key:string]:any}| null{
    const forb = /admin/.test(control.value);
    return forb ? { 'invalidUserName':{value : control.value} }:null;
}
export function generalValidator(regEx : RegExp): ValidatorFn{
    return (control: AbstractControl):{[key:string]:any}| null =>{
        const forb = regEx.test(control.value);
        return forb ? { 'genError':{value : control.value} }:null;

    }
}