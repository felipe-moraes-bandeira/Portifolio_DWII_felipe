
import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { ProjetoService, Projeto } from '../projeto.service';

interface RepositorioGitHub {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  archived: boolean;
}

@Component({
  selector: 'app-projetos',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './projetos.html',
  styleUrl: './projetos.css'
})
export class Projetos implements OnInit {
  private service = inject(ProjetoService);
  private http = inject(HttpClient);

  projetos: Projeto[] = [];
  carregando = true;
  erro = '';

  repositoriosGithub: RepositorioGitHub[] = [];
  carregandoGithub = true;
  erroGithub = '';

  ngOnInit(): void {
    this.carregarProjetosLocais();
    this.carregarRepositoriosGithub();
  }

  private carregarProjetosLocais(): void {
    this.service.listar().subscribe({
      next: (lista) => {
        this.projetos = lista;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Falha ao carregar os projetos do portfólio.';
        this.carregando = false;
      }
    });
  }

  private carregarRepositoriosGithub(): void {
    const url =
      'https://api.github.com/users/felipe-moraes-bandeira/repos' +
      '?per_page=100&sort=updated';

    this.http.get<RepositorioGitHub[]>(url).subscribe({
      next: (lista) => {
        this.repositoriosGithub = lista.filter(
          repo => !repo.archived
        );
        this.carregandoGithub = false;
      },
      error: () => {
        this.erroGithub =
          'Não foi possível carregar os repositórios do GitHub.';
        this.carregandoGithub = false;
      }
    });
  }

  formatarData(data: string): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date(data));
  }
}
