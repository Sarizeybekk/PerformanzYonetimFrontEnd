import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Urun } from 'src/app/models/urunlerModel';
import { AuthService } from 'src/app/service/auth.service';
import { UrunlerService } from 'src/app/service/urunler.service';

@Component({
  selector: 'app-urunler',
  templateUrl: './urunler.component.html',
  styleUrls: ['./urunler.component.scss']
})
export class UrunlerComponent implements OnInit {
  urunler: Urun[] = []
  urun: Urun;
  searchString: string;
  addForm: FormGroup;
  updateForm: FormGroup;

  urunAdi: string = "";
  ekleyenKullaniciFk: string = "";
  birim:string="";
  olusturulanTarih: string;
  not: string

  constructor(
    private urunlerService: UrunlerService,
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

    this.urunlerService.getAll().subscribe((res) => {
      this.urunler = res.data;
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
  currentUrun(urun: Urun) {
    this.urun = urun;
    console.log(this.urun);
  }
  deleteUrunler(id: number) {
    this.showSpinner();
    this.urunlerService.deleteUrun(id).subscribe(res => {
      this.hideSpinner();
      this.toastr.info("Cihaz başarıyla silindi");
      this.getList();

    }, (err => {
      this.toastr.error(" Bir hatayla karşılaştık.Daha sonra tekrar deneyin");
    }));

  }
  createAddForm() {
    this.addForm = this.formBuilder.group({
      urunAdi: [""],
      ekleyenKullaniciFk: [""],
      birim: [""],
      olusturulanTarih: [""],
      not: [""]
    });
  }
  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      id: [0],
      urunAdi: [""],
      ekleyenKullaniciFk: [""],
      birim: [""],
      olusturulanTarih: [""],
      not: [""]
    });
  }
  saveUrun() {

    if (this.addForm.value) {
      //let emanetModel = Object.assign({}, this.addForm.value);
      this.showSpinner();
      this.urunlerService.save(this.addForm.value).subscribe((res) => {
        this.hideSpinner();
        this.toastr.success("Ürün başarıyla eklendi");
        this.getList();

      }, (err) => {
        this.toastr.error(" Bir hatayla karşılaştık.Daha sonra tekrar deneyin");
        this.hideSpinner();
      });
    } else {
      this.toastr.warning("Beklenmedik hatayla ")
    }

  }
  getUrun(id: number) {
    this.showSpinner();
    this.urunlerService.getbyid(id).subscribe(res => {
      this.hideSpinner();
      this.urun = res.data;
      this.updateForm.controls["ekleyenKullaniciFk"].setValue(res.data.ekleyenKullaniciFk);
      this.updateForm.controls["id"].setValue(res.data.id);
      this.updateForm.controls["urunAdi"].setValue(res.data.urunAdi);
      this.updateForm.controls["birim"].setValue(res.data.birim);

      this.updateForm.controls["olusturulanTarih"].setValue(res.data.olusturulanTarih);
      this.updateForm.controls["not"].setValue(res.data.not);


    }, (err => {
      this.toastr.error(" Bir hatayla karşılaştık.Daha sonra tekrar deneyin");
    }));
  }

  updateUrun() {
    if (this.updateForm.valid) {
      let urunModel = Object.assign({}, this.updateForm.value);
      this.showSpinner();
      this.urunlerService.updateUrun(urunModel).subscribe((res) => {
        this.hideSpinner();
        this.toastr.warning("Ürün bilgileri başarıyla güncellendi");
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
