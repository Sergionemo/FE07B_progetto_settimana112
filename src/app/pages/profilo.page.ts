import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  template: `
    <mat-card class="text-center">
      <p>{{ utente.name }}</p>
      <p>{{ utente.email }}</p>
      </mat-card
    >
  `,
  styles: [],
})
export class ProfiloPage implements OnInit {
  constructor(private mainSrv: MainService) {}

  utente!: any;
  async ngOnInit() {
    this.utente = await this.mainSrv.getUtente()?.toPromise();
    console.log(this.utente);
  }
}
