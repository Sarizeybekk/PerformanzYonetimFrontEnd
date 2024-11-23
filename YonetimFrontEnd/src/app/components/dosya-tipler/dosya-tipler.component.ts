import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DosyaTip } from 'src/app/models/dosyaTipModel';
import { AuthService } from 'src/app/service/auth.service';
import { DosyaTiplerService } from 'src/app/service/dosya-tipler.service';

@Component({
  selector: 'app-dosya-tipler',
  templateUrl: './dosya-tipler.component.html',
  styleUrls: ['./dosya-tipler.component.scss']
})
export class DosyaTiplerComponent implements OnInit {

  dosyaTipler: DosyaTip[] = []
  dosyaTip: DosyaTip;
  searchString: string;
  addForm: FormGroup;
  updateForm: FormGroup;


  ekleyenKullaniciFk: string="";
  isim: string="";
  olusturulanTarih: string;
  guncellemeTarihi:string;

  constructor(
    private dosyaTiplerService:DosyaTiplerService,
    private authservice: AuthService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private date: DatePipe
  ) {

    this.guncellemeTarihi = this.date.transform(new Date(), "yyyy-MM-dd")

  }

  ngOnInit(): void {
    this.getList();
    this.createAddForm();
    this.createUpdateForm();
  }

  getList() {
    this.showSpinner();

    this.dosyaTiplerService.getAll().subscribe((res) => {
      this.dosyaTipler = res.data;
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
  currentDosyaTip(dosyaTip: DosyaTip) {
    this.dosyaTip = dosyaTip;
    console.log(this.dosyaTip);
  }
  deleteDosyaTipler(id: number) {
    this.showSpinner();
    this.dosyaTiplerService.deleteDosyaTip(id).subscribe(res => {
      this.hideSpinner();
      this.toastr.info("Dosya tipi başarıyla silindi");
      this.getList();

    }, (err => {
      this.toastr.error(" Bir hatayla karşılaştık.Daha sonra tekrar deneyin");
    }));

  }
  createAddForm() {
    this.addForm = this.formBuilder.group({
      guncellemeTarihi: [""],
      ekleyenKullaniciFk: [""],
      isim: [""],
      olusturulanTarih: [""]
    });
  }
  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      id: [0],
      guncellemeTarihi: [""],
      ekleyenKullaniciFk: [""],
      isim: [""]


    });
  }
  saveDosyaTip() {

    if (this.addForm.value) {
      //let emanetModel = Object.assign({}, this.addForm.value);
      this.showSpinner();
      this.dosyaTiplerService.save(this.addForm.value).subscribe((res) => {
        this.hideSpinner();
        this.toastr.success("Dosya Tipi başarıyla eklendi");
        this.getList();

      }, (err) => {
        this.toastr.error(" Bir hatayla karşılaştık.Daha sonra tekrar deneyin");
        this.hideSpinner();
      });
    } else {
      this.toastr.warning("Beklenmedik hatayla ")
    }

  }
  getDosyaTip(id: number) {
    this.showSpinner();
    this.dosyaTiplerService.getbyid(id).subscribe(res => {
      this.hideSpinner();
      this.dosyaTip = res.data;
      this.updateForm.controls["ekleyenKullaniciFk"].setValue(res.data.ekleyenKullaniciFk);
      this.updateForm.controls["id"].setValue(res.data.id);
      this.updateForm.controls["isim"].setValue(res.data.isim);

      this.updateForm.controls["olusturulanTarih"].setValue(res.data.olusturulanTarih);



    }, (err => {
      this.toastr.error(" Bir hatayla karşılaştık.Daha sonra tekrar deneyin");
    }));
  }

  updateDosyaTip() {
    if (this.updateForm.valid) {
      let dosyaTipModel = Object.assign({}, this.updateForm.value);
      this.showSpinner();
      this.dosyaTiplerService.updateDosyaTip(dosyaTipModel).subscribe((res) => {
        this.hideSpinner();
        this.toastr.warning("Dosya Tip bilgileri başarıyla güncellendi");
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
