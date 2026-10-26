
import { Component, inject, OnInit } from '@angular/core';
import { ProjetoService, Projeto } from '../projeto.service';

interface EstatisticaTecnologia {
  nome: string;
  quantidade: number;
  percentual: number;
  projetos: string[];
}

interface EstatisticaAno {
  ano: number;
  quantidade: number;
}

@Component({
  selector: 'app-estatisticas',
  standalone: true,
  imports: [],
  templateUrl: './estatisticas.html',
  styleUrl: './estatisticas.css'
})
export class Estatisticas implements OnInit {
  private projetoService = inject(ProjetoService);

  projetos: Projeto[] = [];
  tecnologias: EstatisticaTecnologia[] = [];
  anos: EstatisticaAno[] = [];

  carregando = true;
  erro = '';

  ngOnInit(): void {
    this.projetoService.listar().subscribe({
      next: (lista) => {
        this.projetos = lista;
        this.calcularEstatisticas();
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Não foi possível carregar as estatísticas.';
        this.carregando = false;
      }
    });
  }

  private calcularEstatisticas(): void {
    const contagem = new Map<string, string[]>();
    const contagemAnos = new Map<number, number>();

    for (const projeto of this.projetos) {
      const nomes = new Set(
        (projeto.tecnologias || '')
          .split(/[,;|]+/)
          .map(nome => nome.trim())
          .filter(Boolean)
      );

      for (const nome of nomes) {
        const chave = nome.toLowerCase();
        const projetosDaTecnologia = contagem.get(chave) ?? [];

        projetosDaTecnologia.push(projeto.nome);
        contagem.set(chave, projetosDaTecnologia);
      }

      if (projeto.ano) {
        contagemAnos.set(
          projeto.ano,
          (contagemAnos.get(projeto.ano) ?? 0) + 1
        );
      }
    }

    const maiorContagem = Math.max(
      1,
      ...Array.from(contagem.values()).map(lista => lista.length)
    );

    this.tecnologias = Array.from(contagem.entries())
      .map(([chave, projetos]) => ({
        nome: this.nomeOriginal(chave),
        quantidade: projetos.length,
        percentual: Math.round((projetos.length / maiorContagem) * 100),
        projetos
      }))
      .sort((a, b) => b.quantidade - a.quantidade);

    this.anos = Array.from(contagemAnos.entries())
      .map(([ano, quantidade]) => ({ ano, quantidade }))
      .sort((a, b) => a.ano - b.ano);
  }

  private nomeOriginal(chave: string): string {
    const projeto = this.projetos.find(p =>
      (p.tecnologias || '')
        .split(/[,;|]+/)
        .some(t => t.trim().toLowerCase() === chave)
    );

    return projeto?.tecnologias
      .split(/[,;|]+/)
      .find(t => t.trim().toLowerCase() === chave)
      ?.trim() ?? chave;
  }

  get totalTecnologias(): number {
    return this.tecnologias.length;
  }

  get maiorQuantidadePorAno(): number {
    return Math.max(1, ...this.anos.map(item => item.quantidade));
  }

  trackTecnologia(_: number, item: EstatisticaTecnologia): string {
    return item.nome;
  }

  trackAno(_: number, item: EstatisticaAno): number {
    return item.ano;
  }
}
