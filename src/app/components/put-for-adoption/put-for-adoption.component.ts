import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnChanges,
} from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/shared/database.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

import { map, startWith } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { petsInfo } from 'src/app/model/commonInterfaces';

@Component({
  selector: 'app-put-for-adoption',
  templateUrl: './put-for-adoption.component.html',
  styleUrls: ['./put-for-adoption.component.scss'],
})
export class PutForAdoptionComponent implements OnInit {
  dogOrCatObject = [
    { value: 'dog', checked: true },
    { value: 'cat', checked: false },
  ];
  checkedRadioButton = this.dogOrCatObject[0].value;
  // fetchedPetsData: petsInfo[] = [];
  allPetsData: any;
  fetchedPetsData: petsInfo[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  searchTags = new FormControl('');
  filteredTags: Observable<string[]>;
  tags: string[] = ['adorable'];
  allTags: string[] = [
    'adorable',
    'friendly',
    'disabled',
    'vaccinated',
    'kharadi',
    'white',
    'black',
    'indie',
    'spayed',
    'neutered',
    'viman-nagar',
    'kothrud',
  ];

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  isSpinnerLoading: boolean = false;
  myData: any;
  selectedFile?: File;
  fb: any;
  downloadURL?: Observable<string>;
  disable: boolean = false;
  constructor(
    private _snackBar: MatSnackBar,
    private database: DatabaseService,
    private storage: AngularFireStorage
  ) {
    this.filteredTags = this.searchTags.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) =>
        tag ? this._filter(tag) : this.allTags.slice()
      )
    );
  }
  ngOnInit(): void {
    this.allPetsData = this.database.allPutForAdoptionPetsData.subscribe(
      (value) => {
        return value;
      }
    );

  }

  fetchAllPetsData() {
    this.fetchedPetsData = [];
    this.database.fetchAllPetsForUser();
    this.database.fetchAllPetsForUser().then((value) => {
      this.fetchedPetsData.push(...(<[]>value));
    });
  }
  year: string[] = ['none', '0', '1', '2', '3', '5', '6', '7', '8', '9', '10'];
  month: string[] = [
    'none',
    '0',
    '1',
    '2',
    '3',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];

  spayedNeuter: string[] = ['none', 'spayed', 'neutered'];
  selectedYear: string = '0';
  selectedMonth: string = '0';
  selectedSpayedNeuter: string = 'none';
  currDate: any = new Date();
  ownerName = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.maxLength(10),
    Validators.minLength(10),
    Validators.pattern('[- +()0-9]+'),
  ]);

  petPicture = new FormControl('', [Validators.required]);
  additionalTags = new FormControl(this.tags);

  putForAdoptionPetInfo = new FormGroup({
    id: new FormControl(localStorage.getItem('uid'), []),
    ownerName: this.ownerName,
    phoneNumber: this.phoneNumber,
    catOrDog: new FormControl(this.checkedRadioButton, []),
    ageInYear: new FormControl(this.selectedYear, []),
    ageInMonth: new FormControl(this.selectedMonth, []),
    isSpayedNeuter: new FormControl(this.selectedSpayedNeuter, []),
    searchTags: this.additionalTags,
    date: new FormControl(
      String(
        this.currDate.getDate() +
        '-' +
        this.currDate.getMonth() +
        '-' +
        this.currDate.getFullYear()
      )
    ),
    petPicture: this.petPicture,
    notificationID: new FormGroup([], []),
  });

  onFileSelected(event: any) {
    this.isSpinnerLoading = true;
    this.disable = false;
    let imageId = `${new Date().getDate()}${new Date().getHours()}${new Date().getSeconds()}${new Date().getMilliseconds()}`;

    const file = event.target.files[0];
    const filePath = `petImages/${imageId}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`petImages/${imageId}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.fb = url;
            }
            this.isSpinnerLoading = false;
            this.disable = true;
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          console.log(url);
        }
      });
  }

  // isSpinnerLoading(){
  // }
  isDisabled() {
    if (this.putForAdoptionPetInfo.valid && this.disable) {
      return false;
    }
    return true;
  }
  putForAdoption(petInfo: any) {
    this.isSpinnerLoading = true;
    let docRef;
    this.downloadURL?.subscribe((value) => {
      if (value) {
        Object.assign(petInfo, { petPicture: this.fb });
        docRef = this.database.addPetForAdoption(petInfo);
        this.isSpinnerLoading = false;
        this.clearForm();
        this.tags = [];
        if (Boolean(docRef)) {
          this.fetchAllPetsData();
        }
      }
    });
  }

  changeAdoptionStatus(data: any) {
    this.database.updateAdoptionStatus(data.id, data.adopted).then((value) => {
      this.fetchAllPetsData();
    });
  }
  clearForm() {
    this.putForAdoptionPetInfo.reset();
    this.ownerName.setErrors(null);
    this.phoneNumber.setErrors(null);
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add the tags
    if (
      value.toLowerCase() != 'cat' &&
      value.toLowerCase() != 'dog' &&
      value != ''
    ) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.searchTags.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.searchTags.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter((tag) =>
      tag.toLowerCase().includes(filterValue)
    );
  }
}
