import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CihazTip } from 'src/app/models/cihazTipModel';
import { AuthService } from 'src/app/service/auth.service';
import { CihazTiplerService } from 'src/app/service/cihaz-tipler.service';

@Component({
  selector: 'app-cihaz-tipler',
  templateUrl: './cihaz-tipler.component.html',
  styleUrls: ['./cihaz-tipler.component.scss']
})
export class CihazTiplerComponent implements OnInit {

  cihazTipler: CihazTip[] = []
  cihazTip: CihazTip;
  searchString: string;
  addForm: FormGroup;
  updateForm: FormGroup;


  ekleyenKullaniciFk: string="";
  cihazAdi: string="";

  olusturulanTarih: string;
  urunlerJson: string;


  constructor(
    private cihazTiplerService:CihazTiplerService,
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

    this.cihazTiplerService.getAll().subscribe((res) => {
      this.cihazTipler = res.data;
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
  currentCihazTip(cihazTip: CihazTip) {
    this.cihazTip = cihazTip;
    console.log(this.cihazTip);
  }
  deleteCihazTipler(id: number) {
    this.showSpinner();
    this.cihazTiplerService.deleteCihazTip(id).subscribe(res => {
      this.hideSpinner();
      this.toastr.info("Cihaz başarıyla silindi");
      this.getList();

    }, (err => {
      this.toastr.error(" Bir hatayla karşılaştık.Daha sonra tekrar deneyin");
    }));

  }
  createAddForm() {
    this.addForm = this.formBuilder.group({
      cihazAdi: [""],
      ekleyenKullaniciFk: [""],
      urunlerJson: [""],
      olusturulanTarih: [""]
    });
  }
  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      id: [0],
      cihazAdi: [""],
      ekleyenKullaniciFk: [""],
      urunlerJson: [""],
      olusturulanTarih: [""]

    });
  }
  saveCihazTip() {

    if (this.addForm.value) {
      //let emanetModel = Object.assign({}, this.addForm.value);
      this.showSpinner();
      this.cihazTiplerService.save(this.addForm.value).subscribe((res) => {
        this.hideSpinner();
        this.toastr.success("Cihaz Tipi başarıyla eklendi");
        this.getList();

      }, (err) => {
        this.toastr.error(" Bir hatayla karşılaştık.Daha sonra tekrar deneyin");
        this.hideSpinner();
      });
    } else {
      this.toastr.warning("Beklenmedik hatayla ")
    }

  }
  getCihazTip(id: number) {
    this.showSpinner();
    this.cihazTiplerService.getbyid(id).subscribe(res => {
      this.hideSpinner();
      this.cihazTip = res.data;
      this.updateForm.controls["ekleyenKullaniciFk"].setValue(res.data.ekleyenKullaniciFk);
      this.updateForm.controls["id"].setValue(res.data.id);
      this.updateForm.controls["cihazAdi"].setValue(res.data.cihazAdi);
      this.updateForm.controls["urunlerJson"].setValue(res.data.urunlerJson);
      this.updateForm.controls["olusturulanTarih"].setValue(res.data.olusturulanTarih);



    }, (err => {
      this.toastr.error(" Bir hatayla karşılaştık.Daha sonra tekrar deneyin");
    }));
  }

  updateCihazTip() {
    if (this.updateForm.valid) {
      let cihazTipModel = Object.assign({}, this.updateForm.value);
      this.showSpinner();
      this.cihazTiplerService.updateCihazTip(cihazTipModel).subscribe((res) => {
        this.hideSpinner();
        this.toastr.warning("Cihaz Tip bilgileri başarıyla güncellendi");
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
