import { Component } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { Model } from '../../model/model.model';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-character-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './character-add.component.html',
  styleUrl: './character-add.component.css'
})
export class CharacterAddComponent {

  character: Model = new Model();
  constructor(private charactersService: CharactersService) {}

  saveCharacter() {
    if (this.checkValid()) {
      this.charactersService.addCharacter(this.character).subscribe(
        (response) => {
          console.log('Character added successfully:', response);
          this.resetForm();
        },
        (error) => {
          console.error('Error adding character:', error);
        }
      );
    }
  }

  private checkValid(): boolean {
    if (!this.character.name || !this.character.gender || !this.character.species || !this.character.status || !this.character.origin) {
      console.error('missing values');
      return false;
    }
    return true;
  }

  private resetForm() {
    this.character = new Model();
  }
}