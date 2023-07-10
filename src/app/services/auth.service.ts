import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private curlogin: string = ''
  private _i_id: number = AuthService.getRandomInt(999999)
  private static _s_id: number = AuthService.getRandomInt(999999)

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
    console.log(`userIsLogged, _i_id= ${this._i_id}, _s_id= ${AuthService._s_id}`)

    return (this.curlogin !== '')
  }

  currentUser(): string {
    return this.curlogin
  }

  private static getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }  

}
