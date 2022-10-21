import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPrev]'
})
export class PrevDirective {

  constructor(private el :ElementRef) { }

  @HostListener('click')
  prevFunc(){
   var elm=this.el.nativeElement.parentElement.parentElement; 
   var banner = elm.getElementsByClassName('banner');
   elm.prepend(banner[2]);
}


}
