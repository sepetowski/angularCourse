import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  private isOpen = false;
  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  @HostListener('click') onClick() {
    if (!this.isOpen) {
      this.renderer.addClass(this.elementRef.nativeElement, 'open');
      this.isOpen = true;
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'open');
      this.isOpen = false;
    }
  }
}
