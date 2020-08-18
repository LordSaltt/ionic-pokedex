import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  offset = 0;
  pokemon = [];
  constructor(private pokeService: PokemonService) {}

  ngOnInit(){
    this.loadPokemon();
  }

  loadPokemon(loadMore = false, event?) {
    if(loadMore) {
      this.offset += 25;
    }

    this.pokeService.getPokemon(this.offset).subscribe(res => {
      console.log(res);
      this.pokemon = [...this.pokemon, ...res];

      if (event) {
        event.target.complete();
      }
    });
  }

  onSearchChange(e) {
    let value = e.detail.value;

    if (value === '') {
      this.offset = 0;
      this.loadPokemon();
      return;
    } else {
      this.pokeService.findPokemon(value).subscribe(res => {
        console.log(res);
        this.pokemon = [res];
      }, err => {
        this.pokemon = []
      });
    }
  }

}
