import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFontmodify]'
})
export class FontmodifyDirective {

  constructor(private h1: ElementRef<HTMLElement>) {

   }

   applyFontChange():void{
    this.h1.nativeElement.style.fontSize = "20px"
   }

}
