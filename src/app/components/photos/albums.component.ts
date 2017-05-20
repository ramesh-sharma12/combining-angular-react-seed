﻿import { Component, OnInit } from '@angular/core';
import { Album } from '../../domain/album';
import { Paginated } from '../../common/paginated';
import { DataService } from '../../services/data.service';
import { UtilityService } from '../../services/utility.service';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'albums',
    templateUrl: './albums.component.html'
})
export class AlbumsComponent extends Paginated implements OnInit {
    private _albumsAPI: string = 'api/albums/';
    private _albums: Array<Album>;

    constructor(public albumsService: DataService,
        public utilityService: UtilityService,
        public notificationService: NotificationService) {
        super(0, 0, 0);
    }

    ngOnInit() {
        this.albumsService.set(this._albumsAPI, 3);
        this.getAlbums();
    }

    getAlbums(): void {
        this.albumsService.get(this._page)
            .subscribe(res => {
                var data: any = res.json();
                this._albums = data.Items;
                this._page = data.Page;
                this._pagesCount = data.TotalPages;
                this._totalCount = data.TotalCount;
            },
            error => {

                if (error.status == 401 || error.status == 404) {
                    this.notificationService.printErrorMessage('Authentication required');
                    this.utilityService.navigateToSignIn();
                }
            });
    }

    search(i): void {
        super.search(i);
        this.getAlbums();
    };

    convertDateTime(date: Date) {
        return this.utilityService.convertDateTime(date);
    }
}