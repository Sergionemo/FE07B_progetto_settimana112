import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';


@Component({
  template: `
    <div class="container">
      <form #form="ngForm" (ngSubmit)="onSignup(form)">
        <div class="form-container">
          <mat-form-field class="Nome e Cognome" appearance="fill">
            <mat-label>Nome e cognome</mat-label>
            <input
              matInput
              type="text"
              name="name"
              [(ngModel)]="form.value.name"
            />
            <button
              *ngIf="form.value.name"
              matSuffix
              mat-icon-button
              aria-label="Clear"
              (click)="form.value.name = ''"
            >
              <mat-icon>close</mat-icon>
            </button>
          </mat-form-field>
          <mat-form-field class="email" appearance="fill">
            <mat-label>Email</mat-label>
            <input
              matInput
              type="email"
              name="email"
              [(ngModel)]="form.value.email"
            />
            <button
              *ngIf="form.value.email"
              matSuffix
              mat-icon-button
              aria-label="Clear"
              (click)="form.value.email = ''"
            >
              <mat-icon>close</mat-icon>
            </button>
          </mat-form-field>
          <mat-form-field class="password" appearance="fill">
            <mat-label>Password</mat-label>
            <input
              matInput
              type="text"
              name="password"
              [(ngModel)]="form.value.password"
            />
            <button
              *ngIf="form.value.password"
              matSuffix
              mat-icon-button
              aria-label="Clear"
              (click)="form.value.password=''"
            >
              <mat-icon>close</mat-icon>
            </button>
          </mat-form-field>
          <button type="submit" mat-raised-button color="primary">
            Registrati
          </button>
        </div>
      </form>
      <div class="d-flex justify-content-between mt-4">
        <p>Sei registrato?</p>
        <a
          [routerLink]="['/login']"
          routerLinkActive="active"
          class="text-success"
          >Accedi</a
        >
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        width: 20%;
        margin: 20% auto;
      }
      .form-container {
        display: flex;
        flex-direction: column;
      }
      .text-success {
        text-decoration: none;
        color: purple !important;
      }
    `,
  ],
})
export class SignupPage implements OnInit {
  constructor(private router: Router, private authSrv: AuthService) {}

  ngOnInit(): void {}

  async onSignup(form: NgForm) {
    console.log(form.value);
    try {
      await this.authSrv.registration(form.value).toPromise();
      this.router.navigate(['/login']);
    } catch (error) {
      alert(error);
      form.reset();
    }
  }
}
