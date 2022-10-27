import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() { }

  private interestedPetsInfo: any;

  setInterestedPetsInfo(data: any) {
    localStorage.setItem('interestedPetsInfo', JSON.stringify(data));
    this.interestedPetsInfo = data;
  }
  getInterestedPetsInfo() {
    this.interestedPetsInfo = localStorage.getItem("interestedPetsInfo")
    return this.interestedPetsInfo;
  }
}
