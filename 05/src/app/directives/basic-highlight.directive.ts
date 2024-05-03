import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appBasicHighLight]',
})
export class BasicHighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef<HTMLElement>) {}

  //wrong way, we should use renderer
  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = 'red';
  }
}
