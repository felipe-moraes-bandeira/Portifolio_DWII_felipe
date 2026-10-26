
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';

import { ContatoService } from '../contato.service';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './contato.html',
  styleUrl: './contato.css'
})
export class Contato {
  private fb = inject(FormBuilder);
  private service = inject(ContatoService);

  enviando = false;
  sucesso = '';
  erro = '';

  form = this.fb.nonNullable.group({
    nome: ['', [
      Validators.required,
      Validators.minLength(3)
    ]],

    email: ['', [
      Validators.required,
      Validators.email
    ]],

    mensagem: ['', [
      Validators.required,
      Validators.minLength(10)
    ]]
  });

  onSubmit(): void {
    this.sucesso = '';
    this.erro = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.enviando = true;

    this.service.enviar(this.form.getRawValue()).subscribe({
      next: (resp) => {
        this.sucesso = resp.mensagem || 'Mensagem enviada com sucesso!';
        this.form.reset();
        this.enviando = false;
      },

      error: () => {
        this.erro = 'Não foi possível enviar a mensagem. Tente novamente.';
        this.enviando = false;
      }
    });
  }
}
