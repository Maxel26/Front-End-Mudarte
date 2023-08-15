import { Component, OnInit } from '@angular/core';
import { InicioCards } from 'src/app/interfaces/inicioCards.interface';
import { InicioService } from 'src/app/services/inicio.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent  implements OnInit{
  cards!: Array<InicioCards>;

  constructor(
    private inicioService : InicioService
  ) {}

  ngOnInit(): void {
      this.loadCards();
  }

  loadCards() {
    this.inicioService.getCards()
    .subscribe(cards => {this.cards = cards
      console.log(cards); 
    });
  };
}
