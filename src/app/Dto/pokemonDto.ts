export class PokemonDto {
    id: number;
    name: string;
    weight: number;
    types: any;
    species: any;
    images: any;
    abilities: any;
    stats: any;


    constructor(response: any) {
        this.id = response.id;
        this.name = response.name;
        this.weight = response.weight;
        this.images = response.images.slice(0, -2).reverse();
        this.abilities = response.abilities;
        this.types = response.types;
        this.stats = response.stats;
    }

}