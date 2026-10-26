
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { finalize } from 'rxjs';
import { Projeto, ProjetoService } from '../projeto.service';

@Component({
  selector: 'app-gestao',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './gestao.html',
  styleUrl: './gestao.css'
})
export class Gestao implements OnInit {
  private service = inject(ProjetoService);

  projetos: Projeto[] = [];
  carregando = true;
  salvando = false;
  excluindoId: number | null = null;

  erro = '';
  sucesso = '';
  busca = '';
  editandoId: number | null = null;

  anoAtual = new Date().getFullYear();

  form = new FormGroup({
    nome: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)]
    }),
    descricao: new FormControl(''),
    tecnologias: new FormControl(''),
    link_github: new FormControl('', {
      validators: [
        Validators.pattern(/^$|https?:\/\/.+/i)
      ]
    }),
    ano: new FormControl(this.anoAtual, {
      validators: [
        Validators.required,
        Validators.min(2000),
        Validators.max(2100),
        Validators.pattern(/^\d{4}$/)
      ]
    })
  });

  ngOnInit(): void {
    this.carregar();
  }

  get projetosFiltrados(): Projeto[] {
    const termo = this.busca.trim().toLocaleLowerCase('pt-BR');

    if (!termo) return this.projetos;

    return this.projetos.filter(p =>
      [
        p.nome,
        p.descricao,
        p.tecnologias,
        String(p.ano)
      ].some(valor =>
        String(valor ?? '').toLocaleLowerCase('pt-BR').includes(termo)
      )
    );
  }

  get totalTecnologias(): number {
    return new Set(
      this.projetos.flatMap(p => this.separarTecnologias(p.tecnologias))
    ).size;
  }

  get projetosRecentes(): number {
    return this.projetos.filter(p => Number(p.ano) === this.anoAtual).length;
  }

  get tecnologiasMaisUsadas(): { nome: string; quantidade: number }[] {
    const contagem = new Map<string, number>();

    for (const projeto of this.projetos) {
      for (const tecnologia of this.separarTecnologias(projeto.tecnologias)) {
        contagem.set(
          tecnologia,
          (contagem.get(tecnologia) ?? 0) + 1
        );
      }
    }

    return Array.from(contagem.entries())
      .map(([nome, quantidade]) => ({ nome, quantidade }))
      .sort((a, b) => b.quantidade - a.quantidade)
      .slice(0, 5);
  }

  private separarTecnologias(valor: string | null | undefined): string[] {
    return (valor ?? '')
      .split(/[,;|]/)
      .map(t => t.trim())
      .filter(Boolean);
  }

  carregar(): void {
    this.carregando = true;
    this.erro = '';

    this.service.listar()
      .pipe(finalize(() => this.carregando = false))
      .subscribe({
        next: lista => {
          this.projetos = lista;
        },
        error: () => {
          this.erro = 'Não foi possível carregar os projetos. Verifique a API e tente novamente.';
        }
      });
  }


  
tecnologiasDo(projeto: Projeto): string[] {
  return this.separarTecnologias(projeto.tecnologias);
}

  editar(projeto: Projeto): void {
    this.editandoId = projeto.id;
    this.erro = '';
    this.sucesso = '';

    this.form.patchValue({
      nome: projeto.nome,
      descricao: projeto.descricao ?? '',
      tecnologias: projeto.tecnologias ?? '',
      link_github: projeto.link_github ?? '',
      ano: Number(projeto.ano)
    });

    document.querySelector('.formulario-gestao')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  cancelarEdicao(): void {
    this.editandoId = null;
    this.form.reset({ ano: this.anoAtual });
    this.erro = '';
    this.sucesso = '';
  }

  salvar(): void {
    this.erro = '';
    this.sucesso = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.erro = 'Revise os campos destacados antes de salvar.';
      return;
    }

    const valores = this.form.getRawValue();

    const dados: Projeto = {
      id: this.editandoId ?? 0,
      nome: valores.nome!.trim(),
      descricao: valores.descricao?.trim() ?? '',
      tecnologias: valores.tecnologias?.trim() ?? '',
      link_github: valores.link_github?.trim() ?? '',
      ano: Number(valores.ano)
    };

    const estavaEditando = this.editandoId !== null;
    this.salvando = true;

    const requisicao = estavaEditando
      ? this.service.atualizar(this.editandoId!, dados)
      : this.service.criar(dados);

    requisicao
      .pipe(finalize(() => this.salvando = false))
      .subscribe({
        next: () => {
          this.sucesso = estavaEditando
            ? 'Projeto atualizado com sucesso!'
            : 'Projeto cadastrado com sucesso!';

          this.editandoId = null;
          this.form.reset({ ano: this.anoAtual });
          this.carregar();
        },
        error: () => {
          this.erro = 'Não foi possível salvar o projeto. Confira a conexão com a API.';
        }
      });
  }

  excluir(projeto: Projeto): void {
    if (!projeto.id || this.excluindoId !== null) return;

    const confirmado = window.confirm(
      `Deseja excluir o projeto "${projeto.nome}"?\n\nEssa ação não pode ser desfeita.`
    );

    if (!confirmado) return;

    this.erro = '';
    this.sucesso = '';
    this.excluindoId = projeto.id;

    this.service.excluir(projeto.id)
      .pipe(finalize(() => this.excluindoId = null))
      .subscribe({
        next: () => {
          this.projetos = this.projetos.filter(p => p.id !== projeto.id);

          if (this.editandoId === projeto.id) {
            this.cancelarEdicao();
          }

          this.sucesso = `Projeto "${projeto.nome}" excluído com sucesso.`;
        },
        error: () => {
          this.erro = 'Não foi possível excluir o projeto. Tente novamente.';
        }
      });
  }
}
