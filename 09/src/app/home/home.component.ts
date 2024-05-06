import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;
  private customObsSubscription: Subscription;
  constructor() {}

  ngOnInit() {
    //custrom observable from rxjs - someting like setInterval
    // this.firstObsSubscription = interval(1000).subscribe((count) =>
    //   console.log(count)
    // );

    const customIntervalObservable = new Observable<number>((subscriber) => {
      let count = 0;
      setInterval(() => {
        subscriber.next(count++);
        if (count === 2) subscriber.complete();
        if (count > 3) subscriber.error(new Error('My error'));
      }, 1000);
    });

    //opeartors-> it its beetwen subscripon item and observable and it allows to filter some data that observable send and then send only this want we want to subsctipton
    // Observable --- send data ---> operators ---filters---> send to subscritons
    //using pipe() on observable object
    const pipeData = customIntervalObservable.pipe(
      map((number) => `Round: ${number + 1}`)
    );
    //it terms of working we have to pass return data od pipe as susbcitntion bcs we dont change the original data

    //thrwoing error complete the proccess, subscription dies - no need to unscbscribe
    //if subscripton complete it also  dies - no need to unscbscribe
    this.customObsSubscription = pipeData.subscribe(
      (data) => console.log(data),
      (error: string) => alert(error),
      //if throws and error completed never fires up
      () => console.log('completed')
    );
  }
  ngOnDestroy() {
    //need to unsubscribe to custom observables
    // this.firstObsSubscription.unsubscribe();

    this.customObsSubscription.unsubscribe();
  }
}
