import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { DatabaseService } from 'src/app/shared/database.service';

@Component({
  selector: 'app-pet-info',
  templateUrl: './pet-info.component.html',
  styleUrls: ['./pet-info.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetInfoComponent implements OnInit {
  @Input() petsData: any[] = [];
  @Output() changeStatus = new EventEmitter<{}>();
  @Output() updatePetsInfoData = new EventEmitter<{}>();
  constructor(private database: DatabaseService) { }
  panelOpenState = false;
  ngOnInit(): void {
  }

  changeAdoptionStatus(id: string) {
    this.changeStatus.emit({ id: id, adopted: 'true' });
  }

  updatePetsInfo(id: string) {
    for (let i = 0; i < this.petsData.length; i++) {
      if (this.petsData[i].documentID == id) {
        console.log("chid", this.petsData[i])
        this.updatePetsInfoData.emit(this.petsData[i]);
      }
    }
  }
}
