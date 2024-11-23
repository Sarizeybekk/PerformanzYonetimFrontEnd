import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Cihaz } from 'src/app/models/cihazlarModel';
import { CihazTip } from 'src/app/models/cihazTipModel';
import { AuthService } from 'src/app/service/auth.service';
import { CihazTiplerService } from 'src/app/service/cihaz-tipler.service';
import { CihazlarService } from 'src/app/service/cihazlar.service';
import { Guid } from "guid-typescript";
@Component({
  selector: 'app-cihazlar',
  templateUrl: './cihazlar.component.html',
  styleUrls: ['./cihazlar.component.scss']
})
export class CihazlarComponent implements OnInit {

  cihazlar: Cihaz[] = []
  cihaz: Cihaz;
  cihazTipler:CihazTip[]=[];
  searchString: string;
  addCihazForm: FormGroup;
  updateCihazForm:FormGroup;

  ekleyenKullaniciFk: string= "";
  cihazTipFk: number;
  girdilerJson: string="";
  cihazKod: string="";
  gonderimTarihi: string;
  paketTarihi: string;
  guncellemeTarihi:string;

  constructor(
    private cihazlarService: CihazlarService,
    private authservice: AuthService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private cihazTiplerService:CihazTiplerService

  ) { }

  ngOnInit(): void {
    this.getList();
    this.createaddCihazForm();
    this.createUpdateCihazForm();
     this.getListCihazTip();

  }
  getList() {
    this.showSpinner();

    this.cihazlarService.getAll().subscribe((res) => {
      this.cihazlar = res.data;
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

  createaddCihazForm() {
    this.addCihazForm = this.formBuilder.group({
      ekleyenKullaniciFk: [""],
      cihazTipFk: [""],
      girdilerJson: [""],
      cihazKod: [""],
      gonderimTarihi: [(Date(), 'yyyy-MM-dd')],
      paketTarihi: [(Date(), 'yyyy-MM-dd')],

    });
  }
  createUpdateCihazForm() {
    this.updateCihazForm = this.formBuilder.group({
      id: [0],
      ekleyenKullaniciFk: [""],
      cihazTipFk: [""],

      cihazKod: [""],
      guncellemeTarihi: [""]

    });
  }
  currentCihaz(cihaz: Cihaz) {
    this.cihaz = cihaz;
    console.log(this.cihaz);
  }
  deleteCihazlar(id: number) {
    this.showSpinner();
    this.cihazlarService.deleteCihaz(id).subscribe(res => {
      this.hideSpinner();
      this.toastr.info("Cihaz başarıyla silindi");
      this.getList();

    }, (err => {
      this.toastr.error(" Bir hatayla karşılaştık.Daha sonra tekrar deneyin");
    }));

  }
  saveCihaz() {

    if (this.addCihazForm.value) {
      //let emanetModel = Object.assign({}, this.addCihazForm.value);
      this.showSpinner();
      this.cihazlarService.save(this.addCihazForm.value).subscribe((res) => {
        this.hideSpinner();
        this.toastr.success("Cihaz başarıyla eklendi");
        this.getList();

      }, (err) => {
        this.toastr.error(" Bir hatayla karşılaştık.Daha sonra tekrar deneyin");
        this.hideSpinner();
      });
    } else {
      this.toastr.warning("Beklenmedik hatayla karşılaşıldı.Daha sonra tekrar deneyin")
    }

  }


  getCihaz(id: Guid) {
    this.showSpinner();
    this.cihazlarService.getbyid(id).subscribe(res => {
      this.hideSpinner();
      this.cihaz = res.data;
      this.updateCihazForm.controls["ekleyenKullaniciFk"].setValue(res.data.ekleyenKullaniciFk);
      this.updateCihazForm.controls["id"].setValue(res.data.id);
      this.updateCihazForm.controls["cihazKod"].setValue(res.data.cihazKod);
      this.updateCihazForm.controls["cihazTipFk"].setValue(res.data.cihazTipFk);
      this.updateCihazForm.controls["guncellemeTarihi"].setValue(res.data.guncellemeTarihi);

    }, (err => {
      this.toastr.error(" Bir hatayla karşılaştık.Daha sonra tekrar deneyin");
    }));
  }

  updateCihaz() {
    if (this.updateCihazForm.valid) {
      let urunModel = Object.assign({}, this.updateCihazForm.value);
      this.showSpinner();
      this.cihazlarService.updateCihaz(urunModel).subscribe((res) => {
        this.hideSpinner();
        this.toastr.warning("Ürün bilgileri başarıyla güncellendi");
        this.getList();
        this.createaddCihazForm();
        document.getElementById("closeUpdateCihazModal").click();
      }, (err) => {
        this.toastr.error(err.error)
        this.hideSpinner();
      })
    } else {
      this.toastr.error("hata");
    }

  }
  getListCihazTip() {
    this.showSpinner();

    this.cihazTiplerService.getAll().subscribe((res) => {
      this.cihazTipler = res.data;
      this.hideSpinner();


    }, (err) => {
      //console.log(err);
      this.toastr.error("Bir hatayla karşılaştık.Lütfen sonra tekrar deneyin")

    })
  }

  }


