import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { PokemonDto } from '../Dto/pokemonDto';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  details: PokemonDto;
  slideOpts: {

  }

  constructor(private route: ActivatedRoute, private pokeService: PokemonService) {

   }

  ngOnInit() {
    let index = this.route.snapshot.paramMap.get('index');
    this.pokeService.getPokeDetails(index).subscribe(result => {
      this.details = result;
      console.log(result);
    });
  }

}
