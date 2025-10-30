import { BehaviorSubject } from 'rxjs';

export class LoadingFlagService {
  private isLoading = new BehaviorSubject<boolean>(false);
  private action = new BehaviorSubject<string>('');

  $isLoading = this.isLoading.asObservable();
  $action = this.action.asObservable();

  setAction(value: string) {
    this.action.next(value);
  }

  toggle() {
    this.isLoading.next(!this.isLoading.value);
  }
}
