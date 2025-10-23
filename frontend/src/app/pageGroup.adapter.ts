import { Injectable } from '@angular/core';
import { Page, PageGroup } from './page.model';

@Injectable({
  providedIn: 'root',
})
export class PageGroupAdapter {
  fromAPI(data: any): {
    groups: PageGroup[];
    pages: Page[];
  } {
    const groups = data.reduce((acc: any, value: any) => {
      return {
        ...acc,
        ...(value?.group?.id && {
          [value?.group?.id]: {
            id: value?.group?.id,
            name: value?.group?.name,
            pages: data.filter(
              (page: any) => page?.group?.id === value?.group?.id
            ),
          },
        }),
      };
    }, {});

    const pages = data.filter((page: any) => !page?.group);

    return {
      groups: Object.values(groups),
      pages,
    };
  }
}
