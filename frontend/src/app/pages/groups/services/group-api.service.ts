import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  IAddPageToGroupDto,
  ICreateGroupDto,
  OAddUrlGroupDto,
  OCreateGroupDto,
  OGetAllGroupDto,
} from '../dto/group.dto';

@Injectable()
export class GroupApiService {
  http = inject(HttpClient);

  create(body: ICreateGroupDto) {
    return this.http.post<OCreateGroupDto>('group', body);
  }

  getAll() {
    return this.http.get<OGetAllGroupDto>('group');
  }

  addPages(groupId: number | string, body: IAddPageToGroupDto) {
    return this.http.post<OAddUrlGroupDto>(`group/${groupId}/addUrls`, body);
  }

  update(id: string, body: { name: string }) {
    return this.http.put<OCreateGroupDto>(`group/${id}`, body);
  }

  merge(body: { groupIds: string[] }) {
    return this.http.post<OCreateGroupDto>(`group/merge`, body);
  }

  removeGroup(groupId: number) {}
}
