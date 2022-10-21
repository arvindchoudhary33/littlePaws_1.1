import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  images = 'assets/images/home_images/Home_1.jpg'
  images2 = 'assets/images/home_images/Home_2.jpg'
  images3 = 'assets/images/home_images/Home_3.jpg'
  images4 = 'assets/images/home_images/Home_5.jpg'

  @ViewChild('myButton')
  private myButton!: ElementRef;
  
  triggerClick() {
    let el: HTMLElement = this.myButton.nativeElement as HTMLElement;
    setTimeout(()=> el.click(), 5000);
}

}
