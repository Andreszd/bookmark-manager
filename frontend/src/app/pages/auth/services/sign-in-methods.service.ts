import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class SignInMethodsService {
  http = inject(HttpClient);

  getSignInUrl() {
    const url = `${environment.googleOauthUrl}?client_id=${
      environment.clientId
    }&redirect_uri=${
      environment.googleCallbackUrl
    }&scope=${environment.oAuthScopes.join(' ')}&response_type=code`;

    return url;
  }
}
