import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  private curlogin: string = ''

  login(login_: string, password: string):boolean {
    const validLogin = "John Doe"
    const validPassword = "1234"

    if (login_ === validLogin && password === validPassword) {
      this.curlogin = login_
      return true
    }
    else {
      this.curlogin = ''
      return false
    }
  }

  userIsLogged(): boolean {
    return (this.curlogin !== '')
  }

  currentUser(): string {
    return this.curlogin
  }
}
