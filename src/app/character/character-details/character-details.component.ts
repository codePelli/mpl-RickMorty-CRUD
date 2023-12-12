import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from '../../services/characters.service';
import { UppercasePipe } from "../../pipes/uppercase.pipe";
import { FormsModule } from '@angular/forms';
import { Model } from '../../model/model.model';

@Component({
    selector: 'app-character-details',
    standalone: true,
    imports: [UppercasePipe, FormsModule],
    templateUrl: './character-details.component.html',
    styleUrl: './character-details.component.css'
})
export class CharacterDetailsComponent implements OnInit{

  character: Model = new Model();
  
  characterId: number = 0;
  characterDetails: any;

  constructor(
    private route: ActivatedRoute,
    private charService: CharactersService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.characterId = +params['id'];
      this.loadCharacterDetails();
    });
  }

  loadCharacterDetails() {
    this.charService.getCharacterById(this.characterId).subscribe(
      (data) => {
        this.characterDetails = data;
      },
      (error) => {
        console.error('Error fetching character details:', error);
      }
    );
  }

  saveChanges() {
    console.log(this.character);
    this.charService.updateCharacter(this.characterId, this.character).subscribe(
      (response) => {
        console.log('Character updated successfully:', response);
        this.characterDetails.resetForm;
      },
      (error) => {
        console.error('Error updating character:', error);
      }
    );
  }

  deleteCharacter() {
    this.charService.deleteCharacter(this.characterId).subscribe(
      (response) => {
        console.log('Character deleted successfully:', response);
      },
      (error) => {
        console.error('Error deleting character:', error);
      }
    );
  }
}

