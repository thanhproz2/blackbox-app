import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationServiceService } from './services/security/authentication-service.service'
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'blackbox-app';
  private cookies: boolean = false;
  constructor(private _translateService: TranslateService, private _authenticationServiceService: AuthenticationServiceService, private _router: Router) {
    _translateService.setDefaultLang('en');
  }
  public ngOnInit() {
    const cookieId = this._authenticationServiceService.getCookieId();
    if (cookieId === "[object Object]") {
      this.cookies = true;
      this._router.navigate(['/panel']);
    } else {
      this._router.navigate(['/login']);
    }
  }
  switchLanguage(language: string) {
    this._translateService.use(language);
  }

}
