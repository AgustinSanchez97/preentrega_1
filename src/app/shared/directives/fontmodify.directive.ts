import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFontmodify]'
})
export class FontmodifyDirective {

  constructor(private el: ElementRef<HTMLElement>) {
    this.applyFontChange();
   }

   applyFontChange():void{
    this.el.nativeElement.style.fontSize = "20px"
   }

}
