import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from '../services/security/authentication-service.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _authenticationServiceService: AuthenticationServiceService, private _router: Router) { }

  ngOnInit() {
  }
  Logout() {
    this._authenticationServiceService.logOut();
  }
}
