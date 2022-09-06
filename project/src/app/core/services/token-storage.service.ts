import { Injectable } from '@angular/core';
import { ILoggedUSer } from 'src/app/shared/itnerfaces/login.interface';
const TOKEN_KEY = 'accessToken'
const USER_KEY = 'auth-user'

@Injectable({
    providedIn: 'root',
  })

  export class TokenStorageService{


    constructor(){}
    
    public logOut(): void{
        window.sessionStorage.clear()
    }

    public saveToken(token: string):void{
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token)
    }

    public getToken (): string{
        return sessionStorage.getItem(TOKEN_KEY) as string
    }

    public saveUser(user: ILoggedUSer): void{
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    public getUser(): ILoggedUSer{
        return JSON.parse(sessionStorage.getItem(USER_KEY) as string) 
    }

  }