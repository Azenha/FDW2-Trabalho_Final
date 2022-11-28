import { Component } from '@angular/core';
import { Livro } from 'src/app/models/livro.model';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-add-livro',
  templateUrl: './add-livro.component.html',
  styleUrls: ['./add-livro.component.css']
})
export class AddLivroComponent {

  livro: Livro = {
    titulo: '',
    descricao: '',
    publicado: false
  };
  submitted = false;

  constructor(private livroService: LivroService) { }

  saveLivro(): void {
    const data = {
      titulo: this.livro.titulo,
      descricao: this.livro.descricao
    };

    this.livroService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newLivro(): void {
    this.submitted = false;
    this.livro = {
      titulo: '',
      descricao: '',
      publicado: false
    };
  }

}