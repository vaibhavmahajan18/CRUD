import { Validator, NG_VALIDATORS, AbstractControl } from "@angular/forms";
import { Directive } from "@angular/core";

@Directive({
    selector: '[appConfirmEqualValidator]',
    providers:[{
        provide: NG_VALIDATORS,
        useExisting: ConfirmEqualValidatorDirective,
        multi: true
    }]
})

export class ConfirmEqualValidatorDirective implements Validator{
    validate(passGroup: AbstractControl): {[key: string]: any} | null { 
        const passwordfield = passGroup.get('password');
        const confirmPasswordfield = passGroup.get('confirmPassword');
        if(passwordfield && confirmPasswordfield && passwordfield.value !== confirmPasswordfield.value){
            return {'notEqual': true};
        }
        return null;
    }
}