import { Injectable } from '@angular/core';
import { GroupFormValues } from './components/forms/register-group-form/register-group-form.component';
import { Page } from './page.model';

@Injectable({
  providedIn: 'root',
})
export class PageApiService {
  pages: Page[];
  constructor() {
    this.pages = [
      {
        id: 1,
        title: 'Google',
        imgUrl: 'url',
        url: 'url',
        group: {
          id: 1,
          name: 'i dont know',
        },
      },
      {
        id: 2,
        title: 'Gmail',
        imgUrl: 'url',
        url: 'url',
        group: {
          id: 2,
          name: 'group2 ',
        },
      },
      {
        id: 3,
        title: 'keep',
        url: 'url',
        imgUrl: 'url',
      },
      {
        id: 4,
        title: 'keep',
        url: 'url',
        imgUrl: 'url',
      },
      {
        id: 5,
        title: 'keep',
        imgUrl: 'url',
        url: 'url',
      },
      {
        id: 6,
        title: 'keep',
        url: 'url',
        imgUrl: 'url',
        group: {
          id: 3,
        },
      },
    ];
  }

  createGroup(values: GroupFormValues) {
    this.pages.map((page) => {
      if (values.pageIds?.includes(page.id)) {
        page.group = {
          id: new Date().getTime(),
          name: values.name ?? undefined,
          lastUpdated: new Date(),
        };
      }
      return page;
    });
  }

  removeGroup(groupId: number) {}

  addPageToGroup(pageId: number | string, groupId: number | string) {
    const page = this.pages.find((p) => p.id === pageId);
    if (page) {
      page.group = {
        id: groupId,
      };
    }
  }

  getAll() {
    return this.pages;
  }
}
