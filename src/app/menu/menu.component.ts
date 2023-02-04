import { Component, OnInit } from '@angular/core';
import { ICarouselDTO } from '../_common/interfaces/ICarrousel';
import { ISong } from '../_common/interfaces/ISong';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  carousel:ICarouselDTO[] = [];
  songs:ISong[] = [
    {name:"Canción 1",track:'a',yt:'a',lyrics:'a'},
    {name:"Canción 2",track:'a',yt:'a',lyrics:'a'},
    {name:"Canción 3",track:'a',lyrics:'a'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
