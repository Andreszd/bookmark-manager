import { Injectable } from '@angular/core';
import { ParamMap } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RouteStateService {
  private params = new BehaviorSubject<ParamMap>({} as ParamMap);

  save(params: ParamMap) {
    this.params.next(params);
  }

  getValues() {
    return this.params.value;
  }
}
