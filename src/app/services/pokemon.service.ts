import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PokemonDto } from '../Dto/pokemonDto';
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  baseUrl = 'https://pokeapi.co/api/v2';
  imageUrl = 'https://raw.githubusercontent.com/PokeApi/sprites/master/sprites/pokemon/';

  constructor(private http: HttpClient) { }

  getPokemon(offset= 0) {
    return this.http.get(`${this.baseUrl}/pokemon?offset=${offset}&limit=25`).pipe(
      map ( result => {
        return result['results'];
      }),
      map(pokemons => {
        return pokemons.map((poke, index) => {
          poke.image = this.getPokeImage(index + offset + 1);
          poke.pokeIndex = offset + index + 1;
          return poke;
        })
      } )
    );
  }

  getPokeImage(index) {
    return `${this.imageUrl}${index}.png`;
  }

  findPokemon(search) {
    return this.http.get(`${this.baseUrl}/pokemon/${search}`).pipe (
      map( pokemon => {
        pokemon['image'] = this.getPokeImage(pokemon['id']);
        pokemon['pokeIndex'] = pokemon['id'];
        return pokemon;
      })
    );
  }

   getPokeDetails(index) {
    return this.http.get(`${this.baseUrl}/pokemon/${index}`).pipe(
      map(poke => {
        const sprites = Object.keys(poke['sprites']);
        poke['images'] = sprites
          .map(spriteKey => poke['sprites'][spriteKey])
          .filter(img => img);
        const pokemon = new PokemonDto(poke);
        const surl = poke['species'].url;
        this.http.get(surl).pipe(
            map (item => {
              const specie = item['flavor_text_entries'][5];
              return specie['flavor_text'];
            })).subscribe(res => {
              pokemon.species = res.replace(/[^a-zA-Z ]/g, " ");
            });
        return pokemon;
      }));
  }
}
