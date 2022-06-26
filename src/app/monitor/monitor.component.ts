import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {MonitorService} from '../service/monitor.service';
import {Observable, of, Subscription, timer} from 'rxjs';
import {catchError, filter, map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit, OnDestroy {

  message: string;
  time: string;
  monitorSubscription: Subscription;
  timerSubscription: Subscription;

  constructor(private monitorService: MonitorService,
              private renderer: Renderer2) {

  }

  ngOnInit(): void {
    this.timerSubscription = timer(0, 5000)
      .pipe(
        switchMap(() => {
          return this.monitorService.getMessage()
            .pipe(catchError(err => {
              console.error(err);
              return of(undefined);
            }));
        }),
        filter(data => data !== undefined)
      )
      .subscribe(data => {
        this.message = data.message;
        this.updateBackground();

        this.time = new Date()
          .toLocaleString('en-US', {
            hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false
          });
      });


  }

  updateBackground(): void {
    if (this.message === '') {
      this.renderer.removeClass(document.body, 'red-back');
      this.renderer.addClass(document.body, 'green-back');
    } else {
      this.renderer.removeClass(document.body, 'green-back');
      this.renderer.addClass(document.body, 'red-back');
    }
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
    this.monitorSubscription.unsubscribe();
  }
}
