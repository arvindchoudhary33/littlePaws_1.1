import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, Query } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
// import { Auth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';

import {
  collection,
  Firestore,
  query,
  doc,
  where,
  getDocs,
  onSnapshot,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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
    private fStore_: Firestore
  ) { }

  getCurrentUser() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      console.log("email", user.email);
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // ...
    } else {
      console.log('nothing');
      // No user is signed in.
    }
  }
  ngOnInit() { }

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
  async getAllData(tags: string[]) {
    let allQ = query(collection(this.fStore_, 'petsForAdoption'));
    let docsSnap;
    if (tags.length > 0) {
      let q = query(
        collection(this.fStore_, 'petsForAdoption'),
        where('tags', 'array-contains-any', tags)
      );
      console.log('why');
      docsSnap = await getDocs(q);
    } else {
      console.log('noo');
      docsSnap = await getDocs(allQ);
    }
    const allData: any = [];
    docsSnap.forEach((doc) => {
      allData.push(doc.data());
      return doc.data();
    });
    return allData;
  }
}
