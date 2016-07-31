import {Component} from '@angular/core';
import {NgFor} from '@angular/common';
import {NotificationService, event} from '../../services/notification.service';
import {Observable} from 'rxjs/Observable';
import '../../common/rxjs-operators'
import {contains} from '../../common/utils';

@Component({
    selector: 'sidebar',
    templateUrl: 'app/components/SideBar/sidebar.html',
    styleUrls: ['dist/app/components/SideBar/sidebar.css'],
    providers: [NotificationService],
    directives: [NgFor]
})
export class SidebarComponent {
    constructor(private notificationService: NotificationService) {}

	announcements:event[] = [];
    notifications:event[] = [];

	open = false;
	clickToggle$;

    ngOnInit() {
		// Click event for dismissing the sidebar
        this.clickToggle$ = Observable.fromEvent(document, 'click')
            .map((event:any) => event.target.className.split(' '))
            .filter((className:string[]) => !contains(className, 'sidebar') && !contains(className, 'sidebar-toggle'));

		// Get events
		this.notificationService.getEvents().subscribe(
			events => {
				this.announcements = events.announcements,
				this.notifications = events.notifications
			},
			error => {
				console.log('Notification service error', error);
			}
		);
    }

    openSidebar() {
        this.open = true;
        let subscription = this.clickToggle$.subscribe(
            className => {
				this.open = false;
				subscription.unsubscribe();
			}
        )
    }
}
