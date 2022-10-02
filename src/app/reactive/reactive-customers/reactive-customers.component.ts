import {Component, OnInit} from '@angular/core';
import {Customer} from "../../customers/customers/customer";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {rangeValidatorWithParameter} from "./validators/range.validator";
import {confirmEmailValidator} from "./validators/confirm-email.validator";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-reactive-customers',
  templateUrl: './reactive-customers.component.html',
  styleUrls: ['./reactive-customers.component.sass']
})
export class ReactiveCustomersComponent implements OnInit {
  reactiveCustomerForm: FormGroup;
  customer = new Customer();
  emailMessage: string
  confirmEmailMessage: string

  private validationMessages = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.',
    match: 'The confirmation does not match the email address..'
  }

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.reactiveCustomerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      //  lastName: {value: 'n/a', disabled: true},
      lastName: ['', [Validators.required, Validators.maxLength(50)]],

      emailGroup: this.formBuilder.group(
        {
          email: ['', [Validators.required, Validators.email]],
          confirmEmail: ['', [Validators.required]]
        },
        {validators: [confirmEmailValidator]}),

      phone: [''],
      notification: 'email',
      // rating: [null, [rangeValidator]],
      rating: [null, [rangeValidatorWithParameter(1, 5)]],
      sendCatalog: true
    });

    this.reactiveCustomerForm.get('notification').valueChanges
      .subscribe((value) => {
        this.setNotification(value);
      })

    const emailControl = this.reactiveCustomerForm.get('emailGroup.email');
    emailControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value) => {
       this.emailMessage=  this.setErrorMessage(emailControl, this.emailMessage)
      })

    const emailGroup = this.reactiveCustomerForm.get('emailGroup');
    emailGroup.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value) => {
        this.confirmEmailMessage=  this.setErrorMessage(emailGroup, this.confirmEmailMessage)
      })
  }

  populateTestData() {
    console.log(this.reactiveCustomerForm)
    console.log('Saved...', JSON.stringify(this.reactiveCustomerForm.value));

    this.reactiveCustomerForm.patchValue({
      firstName: 'Jack',
      lastName: 'Harkness',
      sendCatalog: false
    })
  }

  setNotification(notification: string): void {
    const phoneControl = this.reactiveCustomerForm.get('phone');

    if (notification === 'text') {
      phoneControl.setValidators([Validators.required, Validators.pattern('^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,7}$')])
    } else {
      phoneControl.clearValidators();
    }

    phoneControl.updateValueAndValidity();
  }

  private setErrorMessage(control: AbstractControl, errorMessage: string): string {
    errorMessage = '';

    if ((control.touched || control.dirty) && control.errors) {

      Object.keys(control.errors)
        .map(key => {
          errorMessage = this.validationMessages[key];
        })
        .join(' ');

      return errorMessage;

    }
  }

}
