import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Users from '../Entity/Users';
import { ApiService } from '../Shared/api.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  
  userData !: any;
  UsersObject : Users = new Users();

  formValue !: FormGroup;
  showRegister !: boolean;
  showUpdate !: boolean;

  constructor(private formBuilder : FormBuilder, private api: ApiService) {

   }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      FirstName:[''],
      LastName:[''],
      Gender:[''],
      BirthDate:[''],
      Address:[''],
      Country:[''],
      State:[''],
      City:[''],
      Pincode:[''],
      Mobile:[''],
      Email:[''],
      Comments:['']
  });

  this.getAllUsers();

}

postUserDetails(){
  this.UsersObject.FirstName = this.formValue.value.FirstName;
  this.UsersObject.LastName=this.formValue.value.LastName;
  this.UsersObject.Gender = this.formValue.value.Gender;
  this.UsersObject.BirthDate=this.formValue.value.BirthDate;
  this.UsersObject.Address = this.formValue.value.Address;
  this.UsersObject.Country=this.formValue.value.Country;
  this.UsersObject.State = this.formValue.value.State;
  this.UsersObject.City=this.formValue.value.City;
  this.UsersObject.Pincode = this.formValue.value.Pincode;
  this.UsersObject.Mobile=this.formValue.value.Mobile;
  this.UsersObject.Email=this.formValue.value.Email;
  this.UsersObject.Comments=this.formValue.value.Comments; 
  
  this.api.createUser(this.UsersObject).subscribe(res=>{
    console.log(res);
    alert("User Registered Successfuly.!®️😊");
    let ref = document.getElementById("cancel");
    ref?.click();
    this.formValue.reset();
    this.getAllUsers();
  }, err=>{
    alert("Something went wrong. Please try again😒")
  })
}

clickRegisterUser(){
  this.formValue.reset();
  this.showRegister = true;
  this.showUpdate=false;
}

getAllUsers(){
  this.api.getUser().subscribe(
    res=>{
      this.userData = res;
      console.log(res);
    })
}

deleteUser(row : any){
  this.api.deleteUser(row.id).subscribe(
    res => {
      alert("User Deleted Succesfully.!😒");
      this.getAllUsers();
    }
  );
}

onEdit(row:any){
  this.showRegister = false;
  this.showUpdate=true;
  this.UsersObject.id = row.id;
  this.formValue.controls['FirstName'].setValue(row.FirstName);
  this.formValue.controls['LastName'].setValue(row.LastName);
  this.formValue.controls['Gender'].setValue(row.Gender);
  this.formValue.controls['BirthDate'].setValue(row.BirthDate);
  this.formValue.controls['Address'].setValue(row.Address);
  this.formValue.controls['Country'].setValue(row.Country);
  this.formValue.controls['State'].setValue(row.State);
  this.formValue.controls['City'].setValue(row.City);
  this.formValue.controls['Pincode'].setValue(row.Pincode);
  this.formValue.controls['Mobile'].setValue(row.Mobile);
  this.formValue.controls['Email'].setValue(row.Email); 
  this.formValue.controls['Comments'].setValue(row.Comments);
}

updateUserDetails()
{
  this.UsersObject.FirstName = this.formValue.value.FirstName;
  this.UsersObject.LastName=this.formValue.value.LastName;
  this.UsersObject.Gender = this.formValue.value.Gender;
  this.UsersObject.BirthDate=this.formValue.value.BirthDate;
  this.UsersObject.Address = this.formValue.value.Address;
  this.UsersObject.Country=this.formValue.value.Country; 
  this.UsersObject.State = this.formValue.value.State;
  this.UsersObject.City=this.formValue.value.City;  
  this.UsersObject.Mobile=this.formValue.value.Mobile;
  this.UsersObject.Email=this.formValue.value.Email;
  this.api.updateUser(this.UsersObject,this.UsersObject.id)
  .subscribe(res =>{
    alert("User Updated Successfully.!");
    let ref = document.getElementById("cancel");
    ref?.click();
    this.formValue.reset();
    this.getAllUsers();
  });
}

}
