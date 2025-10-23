import { BehaviorSubject } from 'rxjs';

export class LoadingFlagService {
  private isLoading = new BehaviorSubject(false);

  $isLoading = this.isLoading.asObservable();

  toggle() {
    this.isLoading.next(!this.isLoading.value);
  }
}
