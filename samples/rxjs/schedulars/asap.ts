/**
 * To run
 * run ts-node samples/rxjs/schedulars/queue.ts
 */
import { Observable, Scheduler } from '@reactivex/rxjs';

var observable = Observable.create(function (proxyObserver) {
  proxyObserver.next(1);
  proxyObserver.next(2);
  proxyObserver.next(3);
  proxyObserver.complete();
})
  .observeOn(Scheduler.queue);

var finalObserver = {
  next: x => console.log('got value ' + x),
  error: err => console.error('something wrong occurred: ' + err),
  complete: () => console.log('done'),
};

console.log('just before subscribe');
observable.subscribe(finalObserver);
console.log('just after subscribe');
