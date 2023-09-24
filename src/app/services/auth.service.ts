import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  login = () => {
    
    this.router.navigate(['/player'])
  }
  
  logout = () => {return true;}
  
  get authenticated(): boolean {
    return false;
  }

}
