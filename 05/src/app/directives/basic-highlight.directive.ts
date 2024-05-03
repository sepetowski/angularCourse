import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appBasicHighLight]',
})
export class BasicHighlightDirective implements OnInit {
  //wrong way, we should use renderer
  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = 'red';
  }
}
