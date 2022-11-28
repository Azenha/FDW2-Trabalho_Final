import { Component, Input, OnInit } from '@angular/core';
import { LivroService } from 'src/app/services/livro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from 'src/app/models/livro.model';

@Component({
  selector: 'app-livro-details',
  templateUrl: './livro-details.component.html',
  styleUrls: ['./livro-details.component.css']
})
export class LivroDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentLivro: Livro = {
    titulo: '',
    descricao: '',
    publicado: false
  };
  
  message = '';

  constructor(
    private livroService: LivroService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getLivro(this.route.snapshot.params["id"]);
    }
  }

  getLivro(id: string): void {
    this.livroService.get(id)
      .subscribe({
        next: (data) => {
          this.currentLivro = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePublicado(status: boolean): void {
    const data = {
      titulo: this.currentLivro.titulo,
      descricao: this.currentLivro.descricao,
      publicado: status
    };

    this.message = '';

    this.livroService.update(this.currentLivro.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentLivro.publicado = status;
          this.message = res.message ? res.message : 'Status atualizado!';
        },
        error: (e) => console.error(e)
      });
  }

  updateLivro(): void {
    this.message = '';

    this.livroService.update(this.currentLivro.id, this.currentLivro)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'Livro atualizado!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteLivro(): void {
    this.livroService.delete(this.currentLivro.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/livros']);
        },
        error: (e) => console.error(e)
      });
  }

}