import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Cihaz } from 'src/app/models/cihazlarModel';
import { Emanet } from 'src/app/models/emanetModel';
import { CihazlarService } from 'src/app/service/cihazlar.service';
import { EmanetlerService } from 'src/app/service/emanetler.service';

@Component({
  selector: 'app-emanetler',
  templateUrl: './emanetler.component.html',
  styleUrls: ['./emanetler.component.scss']
})
export class EmanetlerComponent implements OnInit {
  emanetler: Emanet[] = []
  emanet: Emanet = new Emanet();
  cihazlar:Cihaz[]=[];
  addForm: FormGroup;
  updateForm: FormGroup;

  searchString: string;

  allList: boolean = false;
  activeList: boolean = true;
  passiveList: boolean = false;


  allListCheck: string = "";
  activeListCheck: string = "";
  passiveListCheck: string = "";

  title: string = "Aktif Emanet Liste";
  filterText: string = "";

  cihazFk: string = "";
  ekleyenKullaniciFk: string = "";
  musteriAdSoyad: string = "";
  musteriTelefon: string = "";
  musteriAdres: string = "";
  durum: number;
  teslimEtmeTarihi: string;
  teslimAlmaTarihi: string;
  teslimEdenKisi: string;
  teslimAlanKisi: string;
  emanetMiktari: number;
  olusturulanTarih: string;
  not: string





  constructor(
    private emanetlerService: EmanetlerService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private date: DatePipe,
    private cihazlarService:CihazlarService

  ) {
    this.teslimEtmeTarihi = this.date.transform(new Date(), "yyyy-MM-dd")
    this.teslimAlmaTarihi = this.date.transform(new Date(), "yyyy-MM-dd")
    this.olusturulanTarih = this.date.transform(new Date(), "yyyy-MM-dd")


  }

  ngOnInit(): void {
    this.getList()
    this.spinner.show();
    this.getListCihaz();
    this.createAddForm();
    this.createUpdateForm();
  }

  getList() {
    this.showSpinner();
    this.emanetlerService.getAll().subscribe((res) => {
      this.emanetler = res.data;
      //console.log(this.emanetler);
      this.hideSpinner();
    }, (err) => {
      //console.log(err);
      this.toastr.error("Bir hatayla karşılaştık.Biraz sonra tekrar deneyin")
      this.hideSpinner();
    })
  }


  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }


  deleteEmanetler(id: number) {
    this.showSpinner();
    this.emanetlerService.deleteEmanet(id).subscribe(res => {
      this.hideSpinner();
      this.toastr.info("Emanet başarıyla silindi");
      this.getList();

    }, (err => {
      this.toastr.error(" Bir hatayla karşılaştık.Daha sonra tekrar deneyin");
    }));

  }

  currentEmanet(emanet: Emanet) {
    this.emanet = emanet;
    //console.log(this.emanet);
  }

  changeStatusEmanet(emanet: Emanet) {
    this.showSpinner();
    emanet.durum ? emanet.durum = 0 : emanet.durum = 1
    this.emanetlerService.updateEmanet(emanet).subscribe(res => {
      this.hideSpinner();
      this.toastr.warning("Emanet durumu başarıyla güncellendi");
      this.getList();

    }, (err => {
      this.toastr.error(" Bir hatayla karşılaştık.Daha sonra tekrar deneyin");
      this.hideSpinner();
    }));
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



  createAddForm() {
  let  userId=localStorage.getItem('Id')
console.log(userId)

    this.addForm = this.formBuilder.group({
      cihazFk: [""],
      musteriAdSoyad: [""],
      musteriTelefon: [""],
      musteriAdres: [""],
      durum: 1,
      teslimEtmeTarihi: [(Date(), 'yyyy-MM-dd')],
      teslimAlmaTarihi: [(Date(), 'yyyy-MM-dd')],
      teslimEdenKisi: [""],
      teslimAlanKisi: [""],
      emanetMiktari: [""],
      olusturulanTarih: [(Date(), 'yyyy-MM-dd')],
      not: [""]
    });
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      id: [0],
      cihazFk: [""],
      ekleyenKullaniciFk: [""],
      musteriAdSoyad: [""],
      musteriTelefon: [""],
      musteriAdres: [""],
      durum: 1,
      teslimEtmeTarihi: [(Date(), 'yyyy-MM-dd')],
      teslimAlmaTarihi: [(Date(), 'yyyy-MM-dd')],
      teslimEdenKisi: [""],
      teslimAlanKisi: [""],
      emanetMiktari: [""],
      olusturulanTarih: [(Date(), 'yyyy-MM-dd')],
      not: [""]
    });
  }

  saveEmanet() {

    if (this.addForm.value) {
      //let emanetModel = Object.assign({}, this.addForm.value);
      this.showSpinner();
      this.emanetlerService.save(this.addForm.value).subscribe((res) => {
        this.hideSpinner();
        
        this.toastr.success("Emanet başarıyla eklendi");
        this.getList();

      }, (err) => {
        this.toastr.error(" Bir hatayla karşılaştık.Daha sonra tekrar deneyin");
        this.hideSpinner();
      });
    } else {
      this.toastr.warning("Beklenmedik hatayla ")
    }

  }

  getListByCheck(text: string) {
    //console.log(this.allList);
    //console.log(this.activeList);
    //console.log(this.passiveList);

    if (text == "allList") {
      this.activeList = false;
      this.passiveList = false;

      this.allListCheck = "checked";
      this.activeListCheck = "";
      this.passiveListCheck = "";


      this.filterText = "";
      this.title = "Tüm Emanet  Liste";
    } else if (text == "activeList") {
      this.allList = false;
      this.passiveList = false;

      this.allListCheck = "";
      this.activeListCheck = "checked";
      this.passiveListCheck = "";
      this.filterText = "1";

      this.title = "Aktif Emanet Liste";
    } else if (text == "passiveList") {
      this.allList = false;
      this.activeList = false;

      this.allListCheck = "";
      this.activeListCheck = "";
      this.passiveListCheck = "checked";


      this.filterText = "0";

      this.title = "Pasif Emanet Liste";
    }




  }



  getEmanet(id: number) {
    this.showSpinner();
    this.emanetlerService.getbyid(id).subscribe(res => {
      this.hideSpinner();
      this.emanet = res.data;

      this.updateForm.controls["id"].setValue(res.data.id);
      this.updateForm.controls["cihazFk"].setValue(res.data.cihazFk);
      this.updateForm.controls["musteriAdSoyad"].setValue(res.data.musteriAdSoyad);
      this.updateForm.controls["musteriTelefon"].setValue(res.data.musteriTelefon);
      this.updateForm.controls["musteriAdres"].setValue(res.data.musteriAdres);
      this.updateForm.controls["durum"].setValue(res.data.durum);
      this.updateForm.controls["teslimEdenKisi"].setValue(res.data.teslimEdenKisi);
      this.updateForm.controls["teslimEtmeTarihi"].setValue(res.data.teslimEtmeTarihi);
      this.updateForm.controls["teslimAlmaTarihi"].setValue(res.data.teslimAlmaTarihi);
      this.updateForm.controls["teslimAlanKisi"].setValue(res.data.teslimAlanKisi);
      this.updateForm.controls["emanetMiktari"].setValue(res.data.emanetMiktari);
      this.updateForm.controls["olusturulanTarih"].setValue(res.data.olusturulanTarih);
      this.updateForm.controls["not"].setValue(res.data.not);


    }, (err => {
      this.toastr.error(" Bir hatayla karşılaştık.Daha sonra tekrar deneyin");
    }));
  }

  updateEmanet() {
    if (this.updateForm.valid) {
      let emanetModel = Object.assign({}, this.updateForm.value);
      this.showSpinner();
      this.emanetlerService.updateEmanet(emanetModel).subscribe((res) => {
        this.hideSpinner();
        this.toastr.warning("Emanet başarıyla güncellendi");
        this.getList();
        this.createAddForm();
        document.getElementById("closeUpdateModal").click();
      }, (err) => {
        //console.log(err);
        this.toastr.error(err.error)
        this.hideSpinner();
      })
    } else {
      this.toastr.error("hataaa");
    }

  }
  getListCihaz() {
    this.showSpinner();

    this.cihazlarService.getAll().subscribe((res) => {
      this.cihazlar = res.data;
      this.hideSpinner();


    }, (err) => {
      //console.log(err);
      this.toastr.error("Bir hatayla karşılaştık.Lütfen sonra tekrar deneyin")

    })
  }








}
