import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Sehir } from 'src/app/models/sehirlerModel';
import { AuthService } from 'src/app/service/auth.service';
import { SehirlerService } from 'src/app/service/sehirler.service';

@Component({
  selector: 'app-sehirler',
  templateUrl: './sehirler.component.html',
  styleUrls: ['./sehirler.component.scss']
})
export class SehirlerComponent implements OnInit {

  sehirler: Sehir[] = []
  sehir: Sehir;
  searchString: string;
  addForm: FormGroup;
  updateForm: FormGroup;
  plakaNo: string="";
  sehirIsmi: string="";

  olusturulanTarih: string;
  constructor(
    private sehirlerService: SehirlerService,
    private authservice: AuthService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private date: DatePipe
  ) {
    this.olusturulanTarih = this.date.transform(new Date(), "yyyy-MM-dd")
  }

  ngOnInit(): void {
    this.getList();
this.createAddForm();
this.createUpdateForm();
  }
  getList() {
    this.showSpinner();

    this.sehirlerService.getAll().subscribe((res) => {
      this.sehirler = res.data;
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
  currentSehir(sehir: Sehir) {
    this.sehir = sehir;
    console.log(this.sehir);
  }
  deleteSehirler(id: number) {
    this.showSpinner();
    this.sehirlerService.deleteSehir(id).subscribe(res => {
      this.hideSpinner();
      this.toastr.info("Sehir başarıyla silindi");
      this.getList();

    }, (err => {
      this.toastr.error(" Bir hatayla karşılaştık.Daha sonra tekrar deneyin");
    }));

  }
  createAddForm() {
    this.addForm = this.formBuilder.group({
      plakaNo: [""],
      sehirIsmi: [""],
      olusturulanTarih: [""]

    });
  }
  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      id: [0],
      plakaNo: [""],
      sehirIsmi: [""],
      olusturulanTarih: [""]
    });
  }
  saveSehir() {

    if (this.addForm.value) {
      //let emanetModel = Object.assign({}, this.addForm.value);
      this.showSpinner();
      this.sehirlerService.save(this.addForm.value).subscribe((res) => {
        this.hideSpinner();
        this.toastr.success("Şehir başarıyla eklendi");
        this.getList();

      }, (err) => {
        this.toastr.error(" Bir hatayla karşılaştık.Daha sonra tekrar deneyin");
        this.hideSpinner();
      });
    } else {
      this.toastr.warning("Beklenmedik hatayla ")
    }

  }
  getSehir(id: number) {
    this.showSpinner();
    this.sehirlerService.getbyid(id).subscribe(res => {
      this.hideSpinner();
      this.sehir = res.data;
      this.updateForm.controls["id"].setValue(res.data.id);
      this.updateForm.controls["sehirIsmi"].setValue(res.data.sehirIsmi);
      this.updateForm.controls["plakaNo"].setValue(res.data.plakaNo);

      this.updateForm.controls["olusturulanTarih"].setValue(res.data.olusturulanTarih);



    }, (err => {
      this.toastr.error(" Bir hatayla karşılaştık.Daha sonra tekrar deneyin");
    }));
  }

  updateSehir() {
    if (this.updateForm.valid) {
      let sehirModel = Object.assign({}, this.updateForm.value);
      this.showSpinner();
      this.sehirlerService.updateSehir(sehirModel).subscribe((res) => {
        this.hideSpinner();
        this.toastr.warning("Şehir bilgileri başarıyla güncellendi");
        this.getList();
        this.createAddForm();
        document.getElementById("closeUpdateModal").click();
      }, (err) => {
        this.toastr.error(err.error)
        this.hideSpinner();
      })
    } else {
      this.toastr.error("hata");
    }

  }


}
