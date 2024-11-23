import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/userModel';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: User[] = []
  user: User;
  searchString: string;
  addForm: FormGroup;
  updateForm: FormGroup;
  addSuperAdminForm:FormGroup;
  ıd: string;
  userName: string= "";
  email: string= "";
  password :string="";
  registerDate:string;


  constructor(
    private userService: UserService,
    private authservice: AuthService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private date: DatePipe
  ) {
    this.registerDate = this.date.transform(new Date(), "yyyy-MM-dd")
   }

  ngOnInit(): void {
    this.getList();
this.createAddForm();
this.createAddSuperAdminForm();
this.createUpdateForm();
  }
  getList() {
    this.showSpinner();

    this.userService.getAll().subscribe((res) => {
      this.users = res.data;
      this.hideSpinner();


    }, (err) => {
      //console.log(err);
      this.toastr.error("Bir hatayla karşılaştık.Lütfen sonra tekrar deneyin")

    })
  }

  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }
  changeInputClass(text: string) {
    if (text != "") {
      return "input-group input-group-outline is-valid my-3"
    } else {
      return "input-group input-group-outline is-invalid my-3"
    }
  }
  changeInputtClass(text: number) {
    if (text != 1) {
      return "input-group input-group-outline is-valid my-3"
    } else {
      return "input-group input-group-outline is-invalid my-3"
    }
  }
  currentUrun(user: User) {
    this.user = user;
    console.log(this.user);
  }


  createAddForm() {
    this.addForm = this.formBuilder.group({

      userName:  [""],
      email: [""],
      password :[""],
      registerDate:[""]

    });
  }
  createAddSuperAdminForm() {
    this.addSuperAdminForm = this.formBuilder.group({

      userName:  [""],
      email: [""],
      password :[""],
      registerDate:[""]

    });
  }
  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      id: [0],
      userName:  [""],
      email: [""],
      password :[""],
      registerDate:[""]
    });
  }
  createUser() {

    if (this.addForm.value) {
      //let emanetModel = Object.assign({}, this.addForm.value);
      this.showSpinner();
      this.userService.save(this.addForm.value).subscribe((res) => {
        this.hideSpinner();
        this.toastr.success("Yeni kullanıcı oluşturuldu");
        this.getList();

      }, (err) => {
        this.toastr.error(" Bir hatayla karşılaştık.Daha sonra tekrar deneyin");
        this.hideSpinner();
      });
    } else {
      this.toastr.warning("Beklenmedik hatayla ")
    }

  }
  createSuperAdminUser() {

    if (this.addSuperAdminForm.value) {
      this.showSpinner();
      this.userService.saveSuperAdmin(this.addSuperAdminForm.value).subscribe((res) => {
        this.hideSpinner();
        this.toastr.success("Yeni süper admin oluşturuldu");
        this.getList();

      }, (err) => {
        this.toastr.error(" Bir hatayla karşılaştık.Daha sonra tekrar deneyin");
        this.hideSpinner();
      });
    } else {
      this.toastr.warning("Beklenmedik hatayla ")
    }

  }

 


}
