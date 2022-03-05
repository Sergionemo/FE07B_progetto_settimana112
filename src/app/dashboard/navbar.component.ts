import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  template: `
    <mat-sidenav-container class="main">
      <mat-sidenav opened mode="side" class="nav-link">
        <mat-nav-list class="d-flex flex-column justify-content-between altezza">
          <div>
            <a mat-list-item (click)="goFilm()">Film</a>
            <a mat-list-item (click)="goProfilo()">Profilo</a>
          </div>
          <a mat-list-item (click)="onlogout()" class="mb-4">Logout</a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <main class="m-4">
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
    .main{
      height:100%;
    }
    .nav-link{
      width:200px;
      padding: 0;
    }
    .altezza{
      height: 100%
    }
  `,
  ],
})
export class NavbarComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private authSrv: AuthService) {}

  ngOnInit(): void {}

  goFilm() {
    this.router.navigate(['film'], { relativeTo: this.route });
  }

  goProfilo() {
    this.router.navigate(['profilo'], { relativeTo: this.route });
  }

  onlogout(){
    this.authSrv.logout();
  }
}
