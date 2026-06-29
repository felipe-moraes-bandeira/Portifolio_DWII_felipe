import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Projeto {
  id: number;
  nome: string;
  descricao: string;
  tecnologias: string;
  link_github: string;
  ano: number;
}

@Injectable({ providedIn: 'root' })
export class ProjetoService {
  private http = inject(HttpClient);
  private url = 'https://zany-space-guacamole-97vxjxrq7xg6cr5q-8000.app.github.dev/api/projetos.php';

  listar(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(this.url);
  }
}