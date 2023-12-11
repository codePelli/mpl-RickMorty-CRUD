import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private apiUrl = 'http://localhost:3000/character/';

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<any>{
    let apiUrlWithIds = this.apiUrl + this.randomChars(1, 60);
    console.log(apiUrlWithIds);
    return this.http.get<any>(apiUrlWithIds);
  }
  
  randomChars(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    }

  getCharacterById(id: number): Observable<any> {
    let characterUrl = `${this.apiUrl}/${id}`;
    return this.http.get<any>(characterUrl);
  }

  addCharacter(character: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, character);
  }

  updateCharacter(id: number, updatedCharacter: any): Observable<any> {
    let characterUrl = `${this.apiUrl}/${id}`;
    return this.http.put<any>(characterUrl, updatedCharacter);
  }

  deleteCharacter(id: number): Observable<any> {
    let characterUrl = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(characterUrl);
  }
  
}