import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrl: './cockpit.component.css',
})
export class CockpitComponent {
  //we have to create new event emmiter to make custom event
  @Output() serverCreated = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();
  // @Output() - passing from child to parent by custom events
  @Output() blueprintCreated = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();

  @ViewChild('serverContent') serverContentInput: ElementRef;

  // emit custom event
  onAddServer(name: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: name.value,
      serverContent: this.serverContentInput.nativeElement.value,
    });
  }

  onAddBlueprint(name: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: name.value,
      serverContent: this.serverContentInput.nativeElement.value,
    });
  }
}
