import {Component, OnInit} from '@angular/core';
import {Customer} from "../../customers/customers/customer";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-reactive-customers',
  templateUrl: './reactive-customers.component.html',
  styleUrls: ['./reactive-customers.component.sass']
})
export class ReactiveCustomersComponent implements OnInit {
  reactiveCustomerForm: FormGroup;
  customer = new Customer();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.reactiveCustomerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      //  lastName: {value: 'n/a', disabled: true},
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      notification: 'email',
      sendCatalog: true
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
}
