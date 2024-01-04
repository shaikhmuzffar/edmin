import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiDataService } from 'src/app/services/api-data.service';

//  bootstrap toaster 
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})

export class SurveyComponent {

  // constructor(private apidata:ApiDataService,private toastr: ToastrService){}

  employeeID!:any;
  employeeInfo!:any;

  employeeDetails: any = [];

  constructor(private apidata:ApiDataService, private route:ActivatedRoute){}


  ngOnInit() {
    this.employeeID = this.route.snapshot.paramMap.get('id');
    this.apidata.getSingle(this.employeeID).subscribe((res: any) => {
      this.employeeInfo = res.data;

      // console.log(this.employeeInfo)

      this.loginForm.patchValue({
        name: this.employeeInfo.name,
        phone: this.employeeInfo.phone,
        email: this.employeeInfo.email,
        gender: this.employeeInfo.gender,
        address: this.employeeInfo.address
      });
    });
  }



  loginForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    // Validators.pattern('[a-zA-Z]+$')]
    phone: new FormControl('', [Validators.required]),
    // phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    email: new FormControl('', [Validators.required, Validators.email, this.customEmailValidator.bind(this)],),
    // state:new FormControl('',[Validators.required]),
    cricket:new FormControl(false),
    gaming:new FormControl(false),
    swimming:new FormControl(false),
    dancing:new FormControl(false),
    gender: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.maxLength(100)])
  });

  hobbiesData = [
    { id: 1, name: 'cricket' },
    { id: 2, name: 'gaming' },
    { id: 3, name: 'swimming' },
    { id: 4, name: 'dancing' }
  ];

  printForm() {
    this.employeeDetails = [];
    const id = this.loginForm.value.phone;
    const formData = this.loginForm.value;
    this.employeeDetails.push(formData);
    // api call:
    this.apidata.sendData(formData).subscribe((result) => {
      console.warn(result);
    })

    // to reset the form data
    this.loginForm.reset();

    console.log(this.employeeDetails);
    // this.toastr.success("you have dhdghgfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff a new toast")
    // this.toastr.success('Major Error everything is broken Major Error everything ','Error', {
    //   timeOut: 99000,
    // });
    // alert("form submitted successfully!");
  }


  get name() {
    return this.loginForm.get('name')
  }
  get phone() {
    return this.loginForm.get('phone')
  }
  get email() {
    return this.loginForm.get('email')
  }
  get state() {
    return this.loginForm.get('state')
  }
  get gender() {
    return this.loginForm.get('gender')
  }
  get address() {
    return this.loginForm.get('address')
  }
  get hobbies() {
    return this.loginForm.get('hobbies')
  }
  
  // Custom email validator
  customEmailValidator(control: any) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValid = emailPattern.test(control.value);
    return isValid ? null : { invalidEmail: true };
  }


}
