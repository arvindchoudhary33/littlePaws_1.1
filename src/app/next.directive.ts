import { Directive,ElementRef ,HostListener} from '@angular/core';

@Directive({
  selector: '[appNext]'
})
export class NextDirective {

  constructor(private el : ElementRef) {
    console.log(this.el.nativeElement)
   }

   @HostListener('click')
   nextFunc(){
    var elm=this.el.nativeElement.parentElement.parentElement; 
    var banner = elm.getElementsByClassName('banner');
    console.log(elm)
    console.log(banner);
    elm.append(banner[0]);
  

}}
