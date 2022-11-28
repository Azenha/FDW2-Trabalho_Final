import { Component, OnInit } from '@angular/core';
import { Livro } from 'src/app/models/livro.model';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-livros-list',
  templateUrl: './livros-list.component.html',
  styleUrls: ['./livros-list.component.css']
})
export class LivrosListComponent implements OnInit {

  livros?: Livro[];
  currentLivro: Livro = {};
  currentIndex = -1;
  titulo = '';

  constructor(private livroService: LivroService) { }

  ngOnInit(): void {
    this.retrieveLivros();
  }

  retrieveLivros(): void {
    this.livroService.getAll()
      .subscribe({
        next: (data) => {
          this.livros = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveLivros();
    this.currentLivro = {};
    this.currentIndex = -1;
  }

  setActiveLivro(livro: Livro, index: number): void {
    this.currentLivro = livro;
    this.currentIndex = index;
  }

  removeAllLivros(): void {
    this.livroService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitulo(): void {
    this.currentLivro = {};
    this.currentIndex = -1;

    this.livroService.findByTitulo(this.titulo)
      .subscribe({
        next: (data) => {
          this.livros = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}