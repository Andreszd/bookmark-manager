import { Component, inject, OnInit } from '@angular/core';
import { BookmarkService } from 'src/app/shared/services/bookmark.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  bookmarkService = inject(BookmarkService);

  ngOnInit(): void {
    this.bookmarkService.getAll();
    this.bookmarkService.getGroups();
  }

  listUrlsByGroup(groupId: string) {
    if (!this.bookmarkService.urlsByGroup.has(groupId)) {
      this.bookmarkService.getAll({ groupId });
    }
  }
}
