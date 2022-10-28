import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, Query } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
// import { Auth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';

import {
  collection,
  documentId,
  Firestore,
  updateDoc,
  arrayUnion,
  getDoc,
  query,
  addDoc,
  doc,
  where,
  getDocs,
  onSnapshot,
  orderBy,
} from '@angular/fire/firestore';
import { BehaviorSubject, empty, Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { petsInfo } from '../model/commonInterfaces';
import { InterestedInfoComponent } from '../components/interested-info/interested-info.component';

export interface interestedInfo {
  city: '';
  landmark: '';
  name: '';
  petsOwnerID: '';
  phoneNumber: '';
  query: '';
}
@Injectable({
  providedIn: 'root',
})
export class DatabaseService implements OnInit {
  notificationsChangeSubject: Subject<String> = new BehaviorSubject<String>(
    ''
  );
  allPutForAdoptionPetsData: Subject<petsInfo[]> = new BehaviorSubject<
    petsInfo[]
  >([]);
  userID: any;
  allNotifications: any[] = [];
  constructor(
    private authService: AuthService,
    private fStore: AngularFirestore,
    private fAuth: AngularFireAuth,
    private fStore_: Firestore,
    private _snackBar: MatSnackBar
  ) {
    localStorage.setItem('currNotificationCount', '0');
    localStorage.setItem('prevNotificationCount', '0');
  }

  ngOnInit() { }

  openSnackBar(message: any) {
    this._snackBar.open(message, 'Cancel', {
      duration: 3000,
      panelClass: ['green-snack-bar'],
    });
  }
  async getAllData(tags: string[], catOrDogFilter: string) {
    let allQ = query(collection(this.fStore_, 'petsForAdoption'));
    let docsSnap;
    let q;
    if (tags.length > 0) {
      q = query(
        collection(this.fStore_, 'petsForAdoption'),
        where('searchTags', 'array-contains-any', tags),
        where('catOrDog', '==', catOrDogFilter)
      );
    } else {
      q = query(
        collection(this.fStore_, 'petsForAdoption'),
        where('catOrDog', '==', catOrDogFilter)
      );
      // docsSnap = await getDocs(allQ);
    }
    docsSnap = await getDocs(q);
    const allData: any = [];
    docsSnap.forEach((doc) => {
      let obj = doc.data();
      Object.assign(obj, { documentID: doc.id });
      allData.push(obj);
      return obj;
    });
    return allData;
  }

  async addPetForAdoption(petInfo: any) {
    const docRef = await addDoc(collection(this.fStore_, 'petsForAdoption'), {
      ownerName: petInfo.ownerName,
      phoneNumber: petInfo.phoneNumber,
      age: String(
        petInfo.ageInYear + ' year ' + petInfo.ageInMonth + ' month '
      ),
      date: petInfo.date,
      isSpayedNeuter: petInfo.isSpayedNeuter,
      petPictureURL: petInfo.petPicture,
      searchTags: petInfo.searchTags,
      catOrDog: petInfo.catOrDog,
      adopted: 'false',
      uid: localStorage.getItem('uid'),
    });
    if (docRef.id != '') {
      this.openSnackBar('Added Successfully');
      return true;
    }
    return false;
  }

  async fetchAllPetsForUser() {
    // this.checkForNotificationChange()
    let fetchedPetsInfo: petsInfo[] = [];
    const q = query(
      collection(this.fStore_, 'petsForAdoption'),
      orderBy('adopted'),
      orderBy('date'),
      where('uid', '==', localStorage.getItem('uid'))
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let obj = doc.data();
      Object.assign(obj, { documentID: doc.id });
      fetchedPetsInfo.push(Object(obj));
    });
    this.allPutForAdoptionPetsData.next(Object(this.fetchAllPetsForUser));
    if (fetchedPetsInfo.length > 0) {
      return fetchedPetsInfo;
    }
    return false;
  }

  async addContactUsInfo(data: any) {
    const docRef = await addDoc(
      collection(this.fStore_, 'contactFormInfo'),
      data
    )
      .then((docRef) => {
        this.openSnackBar('Query submitted successfully');
        return true;
      })
      .catch((error) => {
        this.openSnackBar(error.message);
        console.log(error);
        return false;
      });
  }

  async updateAdoptionStatus(id: string, status: string) {
    const docRef = doc(this.fStore_, 'petsForAdoption', id);
    await updateDoc(docRef, {
      adopted: status,
    })
      .then((value) => {
        this.openSnackBar('status changed successfully');
        this.fetchAllPetsForUser();
        return true;
      })
      .catch((e) => {
        this.openSnackBar(e.message);
        return false;
      });
  }

  async fetchSpecificPetsData(id: string) {
    const docRef = doc(this.fStore_, 'petsForAdoption', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else return false;
  }

  async fetchInterestedUsers() {
    this.allNotifications = [];
    let allData: any;
    const q = query(
      collection(this.fStore_, 'interestedUsersInfo'),
      orderBy('date', 'desc'),
      where('petsOwnerID', '==', localStorage.getItem('uid'))
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      allData = doc.data();
      Object.assign(allData, { interestedUserID: doc.id });
      this.allNotifications.push(allData);
    });

    return this.allNotifications.length;
  }

  checkForNotificationChange() {
    let currCount;
    this.fetchInterestedUsers().then(value => {
      currCount = Number(value)

      let prevCount = Number(localStorage.getItem('prevNotificationCount'));
      console.log("please", currCount, prevCount)
      if (currCount !== prevCount) {
        localStorage.setItem('prevNotificationCount', String(currCount));
        currCount = Math.abs(prevCount - currCount);
        this.notificationsChangeSubject.next(String(currCount));
      }
    })
    console.log('currrrr', currCount)
    return currCount;
  }

  async updateNotification(id: string, interestedUserID: string) {
    const docRef = doc(this.fStore_, 'petsForAdoption', id);
    await updateDoc(docRef, {
      notificationID: arrayUnion(interestedUserID),
    });
  }
  async addInterestedUserInfo(data: any) {
    const docRef = await addDoc(
      collection(this.fStore_, 'interestedUsersInfo'),
      data
    )
      .then((docRef) => {
        this.updateNotification(data.petsInfoID, docRef.id);
        this.openSnackBar('Submitted successfully');
        this.checkForNotificationChange()
        return true;
      })
      .catch((error) => {
        this.openSnackBar(error.message);
        console.log(error);
        return false;
      });
  }
}
