import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';
import { DatabaseService } from 'src/app/shared/database.service';

@Component({
  selector: 'app-interested-info',
  templateUrl: './interested-info.component.html',
  styleUrls: ['./interested-info.component.scss'],
})
export class InterestedInfoComponent implements OnInit {
  isLoading: boolean = false;
  interestedPetInfo: any = {};
  constructor(
    private route: ActivatedRoute,
    private database: DatabaseService,
    private common: CommonService
  ) {

  }
  // id: any;

  ngOnInit(): void {
    this.interestedPetInfo = JSON.parse(this.common.getInterestedPetsInfo());
    if (this.interestedPetInfo == null) {
      console.log('please select a pet ');
    }
    console.log(this.interestedPetInfo.documentID);
    // this.route.params.subscribe((params) => {
    //   this.id = params['id'];
    // });
    // this.database.fetchSpecificPetsData(this.id).then((value) => {
    //   this.interestedPetInfo = value;
    //   console.log(value);
    // });
    // console.log(this.id);
    // console.log(this.interestedPetInfo);
  }

  phoneNumLen = 10;
  name = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.maxLength(this.phoneNumLen),
    Validators.minLength(this.phoneNumLen),
  ]);
  landmark = new FormControl('', [Validators.required]);
  city = new FormControl('', [Validators.required]);
  query = new FormControl('', [Validators.required]);
  // petsOwnerID = new FormControl(String(this.interestedPetInfo.documentID), [])
  currDate = new Date()
  userInfoFormGroup = new FormGroup({

    name: this.name,
    phoneNumber: this.phoneNumber,
    landmark: this.landmark,
    city: this.city,
    query: this.query,
    date: new FormControl(
      String(
        this.currDate.getDate() +
        '-' +
        this.currDate.getMonth() +
        '-' +
        this.currDate.getFullYear()
      ))
    // petsOwnerID: this.petsOwnerID
  });

  submitUserInfo(data: any) {
    Object.assign(data, { petsOwnerID: this.interestedPetInfo.documentID })
    console.log("wwww", this.interestedPetInfo.documentID)
    this.isLoading = true;
    this.database.addInterestedUserInfo(data).then(value => {
      this.isLoading = Boolean(value)
    })
    console.log(data);
  }




}
