import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, Query } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
// import { Auth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';

import {
  collection,
  Firestore,
  updateDoc,
  query,
  addDoc,
  doc,
  where,
  getDocs,
  onSnapshot,
} from '@angular/fire/firestore';
import { BehaviorSubject, empty, Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { petsInfo } from '../model/commonInterfaces';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService implements OnInit {
  // anyChange: Subject<Boolean> = new BehaviorSubject<Boolean>(false);
  userID: any;
  constructor(
    private authService: AuthService,
    private fStore: AngularFirestore,
    private fAuth: AngularFireAuth,
    private fStore_: Firestore,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() { }

  openSnackBar(message: any) {
    this._snackBar.open(message, 'Cancel', {
      duration: 3000,
      panelClass: ['green-snack-bar'],
    });
  }
  // unsubscribe: any;
  // fetchAllPets(tags: string[]) {
  //   const q = query(
  //     collection(this.fStore_, 'petsForAdoption'),
  //     where('tags', 'array-contains-any', tags)
  //   );
  //   const allData: any = [];
  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     snapshot.docChanges().forEach((change) => {
  //       if (change.type === 'added') {
  //         allData.push(change.doc.data());
  //         this.anyChange.next(true);
  //         console.log('New city: ', change.doc.data());
  //       }
  //       if (change.type === 'modified') {
  //         console.log('Modified city: ', change.doc.data());
  //       }
  //       if (change.type === 'removed') {
  //         console.log('Removed city: ', change.doc.data());
  //       }
  //       return change.doc.data();
  //     });
  //   });
  //   return allData;
  //   this.unsubscribe;
  // }
  //

  // async getCurrentUser(): Promise<User | undefined> {
  //      return await this.auth.currentUser;
  //  }
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
      console.log('why');
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
      allData.push(doc.data());
      return doc.data();
    });
    return allData;
  }

  async addPetForAdoption(petInfo: any) {
    console.log(petInfo);
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
      adopted: false,
      uid: localStorage.getItem('uid'),
    });
    if (docRef.id) {
      this.openSnackBar('Added Successfully');
      return true;
    }
    console.log(docRef.id);
    return false;
  }

  async fetchAllPetsForUser() {
    let fetchedPetsInfo: petsInfo[] = [];
    const q = query(
      collection(this.fStore_, 'petsForAdoption'),
      where('uid', '==', localStorage.getItem('uid'))
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let obj = doc.data();
      Object.assign(obj, { documentID: doc.id });
      console.log('oooooo', obj);
      fetchedPetsInfo.push(Object(obj));
      console.log(doc.id, ' => ', obj);
    });
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

    const docRef = doc(this.fStore_, "petsForAdoption", id);

    await updateDoc(docRef, {
      adopted: status
    }).then(value => {
      this.openSnackBar("status changed successfully")
      return true
    }).catch(e => {
      this.openSnackBar(e.message)
      return false;
    })
  }
}
