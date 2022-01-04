import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public places = [
    {name: 'zurich', icon: './assets/icons/zurich.webp', dist: '3,5 heures de route'},
    {name: 'genève', icon: './assets/icons/geneve.webp', dist: '15 minutes de route'},
    {name: 'montreux', icon: './assets/icons/montreux.webp', dist: '2 heures de route'},
    {name: 'lausanne', icon: './assets/icons/lausanne.webp', dist: '1 heure de route'},
  ];
  public items = [
    {name: 'Escapades en pleine nature', icon: './assets/icons/home-001.webp'},
    {name: 'Logements uniques', icon: './assets/icons/home-002.webp'},
    {name: 'Logements entiers', icon: './assets/icons/home-003.webp'},
    {name: 'Animaux de compagnie acceptés', icon: './assets/icons/home-004.webp'},
  ];

  constructor() { }

  ngOnInit(): void {
    
  }

}
