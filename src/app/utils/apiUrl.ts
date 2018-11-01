import { Injectable } from '@angular/core';

@Injectable()
export class apiUrl {
    origin: string = window.location.origin || (window.location.protocol + '//' + window.location.host);
    api_address: string = origin + '/api';

    //USER
    login: string = this.api_address + '/login';
}