import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrl: './server-element.component.css',
})
export class ServerElementComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  //with Input decorator we can pass data from parent to child component, as argument we can pass the name of property, if we leave blank we wil have deafult name es element in this case
  @Input('srvElement') element: { name: string; type: string; content: string };
  @Input() name: string;
  @ContentChild('contentParagraph') paragraph: ElementRef<HTMLParagraphElement>;

  constructor() {
    console.log('constructor called');
  }

  ngOnInit() {
    console.log('ngOnInit called');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called');
    console.log(changes);
  }

  ngDoCheck() {
    console.log('ngDoCheck called');
  }
  ngAfterContentInit() {
    console.log(' ngAfterContentInit called');
  }
  ngAfterContentChecked() {
    console.log(' ngAfterContentChecked called');
    console.log(this.paragraph.nativeElement.textContent);
  }

  ngAfterViewInit() {
    console.log(' ngAfterViewInit called');
  }
  ngAfterViewChecked() {
    console.log(' ngAfterViewChecked called');
  }
  ngOnDestroy() {
    console.log('  ngOnDestroy called');
  }
}
