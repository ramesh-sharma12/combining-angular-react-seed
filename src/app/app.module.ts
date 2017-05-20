import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {Location, LocationStrategy, HashLocationStrategy} from '@angular/common';
import {Headers, RequestOptions, BaseRequestOptions} from '@angular/http';

import {AngularFireModule} from 'angularfire2';

import {AccountModule} from './components/account/account.module';
import {AppComponent} from './app.component';
import {AlbumPhotosComponent} from './components/photos/album-photos.component';
import {HomeComponent} from './components/home/home.component';
import {PhotosComponent} from './components/photos/photos.component';
import {AlbumsComponent} from './components/photos/albums.component';
import {routing} from './routes';

import {DataService} from './services/data.service';
import {MembershipService} from './services/membership.service';
import {UtilityService} from './services/utility.service';
import {NotificationService} from './services/notification.service';

// Must export the config
export const firebaseConfig = {
    apiKey: "AIzaSyDfrCp09IIjoAMawzlYuO6JX6FW9aBcdTQ",
    authDomain: "photogallery-15ec6.firebaseapp.com",
    databaseURL: "https://photogallery-15ec6.firebaseio.com",
    projectId: "photogallery-15ec6",
    storageBucket: "photogallery-15ec6.appspot.com",
    messagingSenderId: "259589253153"
};

class AppBaseRequestOptions extends BaseRequestOptions {
    headers : Headers = new Headers();

    constructor() {
        super();
        this
            .headers
            .append('Content-Type', 'application/json');
        this.body = '';
    }
}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        AccountModule,

        AngularFireModule.initializeApp(firebaseConfig)
    ],
    declarations: [
        AppComponent, AlbumPhotosComponent, HomeComponent, PhotosComponent, AlbumsComponent
    ],
    providers: [
        DataService,
        MembershipService,
        UtilityService,
        NotificationService, {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }, {
            provide: RequestOptions,
            useClass: AppBaseRequestOptions
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}