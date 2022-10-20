import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Atil } from 'src/app/models/atilanlarModel';
import { Urun } from 'src/app/models/urunlerModel';
import { AtillarService } from 'src/app/service/atillar.service';
import { AuthService } from 'src/app/service/auth.service';
import { UrunlerService } from 'src/app/service/urunler.service';

@Component({
  selector: 'app-atilanlar',
  templateUrl: './atilanlar.component.html',
  styleUrls: ['./atilanlar.component.scss']
})
export class AtilanlarComponent implements OnInit {

  atillar: Atil[] = []
  atil: Atil;
  urunler:Urun[]=[];
  addForm: FormGroup;
  updateAtilForm:FormGroup;
  searchString: string;

  urunFk:number;
  ekleyenKullaniciFk: string= "";
  atilNedeni: string= "";
  atilMiktar: number;
  atilTip: number;
  not: string="";
  olusturulanTarih:string;
  guncellemeTarihi :string;



  constructor(
    private atillarService:AtillarService ,
    private authservice: AuthService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private urunlerService:UrunlerService,
    private date: DatePipe

  ) {
    this.guncellemeTarihi = this.date.transform(new Date(), "yyyy-MM-dd")

  }

  ngOnInit(): void {
    this.getList();
this.createAddForm();
this.createUpdateAtilForm();
this.getListUrun();
  }
  getList() {
    this.showSpinner();

    this.atillarService.getAll().subscribe((res) => {
      this.atillar = res.data;
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

  currentAtil(atil: Atil) {
    this.atil = atil;
    console.log(this.atil);
  }
  deleteAtillar(id: number) {
    this.showSpinner();
    this.atillarService.deleteAtil(id).subscribe(res => {
      this.hideSpinner();
      this.toastr.info("Atil başarıyla silindi");
      this.getList();

    }, (err => {
      this.toastr.error(" Bir hatayla karşılaştık.Daha sonra tekrar deneyin");
    }));

  }
  createAddForm() {
    this.addForm = this.formBuilder.group({
      urunFk:[""],
      atilNedeni: [""],
      ekleyenKullaniciFk: [""],
      atilMiktar: 1,
      olusturulanTarih: [""],
      guncellemeTarihi: [""],
      atilTip:[""],
      not: [""]
    });
  }
  createUpdateAtilForm() {
    this.updateAtilForm = this.formBuilder.group({
      id: [0],
      urunFk:[""],
      atilNedeni: [""],
      ekleyenKullaniciFk: [""],
      atilMiktar: 1,
      olusturulanTarih: [""],
      guncellemeTarihi: [""],
      atilTip:[""],
      not: [""]

    });
  }
  saveAtil() {

    if (this.addForm.value) {

      this.showSpinner();
      this.atillarService.save(this.addForm.value).subscribe((res) => {
        this.hideSpinner();
        this.toastr.success("Atil başarıyla eklendi");
        this.getList();

      }, (err) => {
        this.toastr.error(" Bir hatayla karşılaştık.Daha sonra tekrar deneyin");
        this.hideSpinner();
      });
    } else {
      this.toastr.warning("Beklenmedik hatayla ")
    }

  }

  getListUrun() {
    this.showSpinner();

    this.urunlerService.getAll().subscribe((res) => {
      this.urunler = res.data;
      this.hideSpinner();


    }, (err) => {
      //console.log(err);
      this.toastr.error("Bir hatayla karşılaştık.Lütfen sonra tekrar deneyin")

    })
  }


  getAtil(id: number) {
    this.showSpinner();
    this.atillarService.getbyid(id).subscribe(res => {
      this.hideSpinner();
      this.atil = res.data;
      this.updateAtilForm.controls["ekleyenKullaniciFk"].setValue(res.data.ekleyenKullaniciFk);
      this.updateAtilForm.controls["id"].setValue(res.data.id);
      this.updateAtilForm.controls["atilNedeni"].setValue(res.data.atilNedeni);
      this.updateAtilForm.controls["atilMiktar"].setValue(res.data.atilMiktar);
      this.updateAtilForm.controls["atilTip"].setValue(res.data.atilTip);
      this.updateAtilForm.controls["urunFk"].setValue(res.data.urunFk);
      this.updateAtilForm.controls["guncellemeTarihi"].setValue(res.data.guncellemeTarihi);
      this.updateAtilForm.controls["not"].setValue(res.data.not);


    }, (err => {
      this.toastr.error(" Bir hatayla karşılaştık.Daha sonra tekrar deneyin");
    }));
  }

  updateAtil() {
    if (this.updateAtilForm.valid) {
      let urunModel = Object.assign({}, this.updateAtilForm.value);
      this.showSpinner();
      this.atillarService.updateAtil(urunModel).subscribe((res) => {
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
