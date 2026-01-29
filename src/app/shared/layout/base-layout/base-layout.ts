import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-base-layout',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './base-layout.html',
  styleUrl: './base-layout.css',
})
export class BaseLayout {

}
