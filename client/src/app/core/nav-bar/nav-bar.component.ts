import {Component, OnInit} from '@angular/core';
import {BasketService} from "../../basket/basket.service";
import {Observable} from "rxjs";
import {IBasket} from "../../shared/Models/basket";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  title = 'IC';
  basket$!: Observable<IBasket>;


  constructor(private basketService: BasketService) {
  }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }


}
