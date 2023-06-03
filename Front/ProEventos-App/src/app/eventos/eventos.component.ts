import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

// Definição da interface Evento
interface Evento {
  tema: string;
  local: string;
  eventoId: string;
  imagemURL: string;
  dataEvento: string;
  qtdPessoas: string;
  lote: string;
}

// Anotação de Componente, que define este TypeScript como um componente Angular.
// Ele especifica o seletor do componente, o caminho do arquivo HTML do componente e o caminho do arquivo SCSS (para estilos CSS).
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})

// Exportação da classe EventosComponent. Ela implementa a interface OnInit que contém o método ngOnInit.
export class EventosComponent implements OnInit {
  // Declaração das propriedades do componente.
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  private _filtroLista: string = '';

  // Getters e setters para a propriedade filtroLista.
  // O setter atualiza _filtroLista e filtra os eventos quando um valor é definido.
  public get filtroLista(): string {
    return this._filtroLista;
  }
  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista
      ? this.filtrarEventos(this.filtroLista)
      : this.eventos;
  }

  // O construtor do componente que injeta o HttpClient para fazer requisições HTTP.
  constructor(private http: HttpClient) {}

  // O método ngOnInit que é chamado quando o componente é inicializado.
  // Ele chama o método getEventos para preencher os eventos.
  ngOnInit() {
    this.getEventos();
  }

  // Método para filtrar os eventos por tema ou local.
  filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: Evento) =>
        evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  // Método para obter os eventos a partir de uma API.
  // Ele se inscreve para a requisição HTTP e atualiza as propriedades eventos e eventosFiltrados quando recebe uma resposta.
  // Se houver um erro, ele registra o erro e limpa as propriedades eventos e eventosFiltrados.
  public getEventos(): void {
    this.http.get<Evento[]>('https://localhost:5001/api/eventos').subscribe(
      (response) => {
        this.eventos = response;
        this.eventosFiltrados = this.eventos;
      },
      (error) => {
        console.error('Houve um erro ao recuperar os eventos.', error);
        this.eventos = [];
        this.eventosFiltrados = [];
      }
    );
  }
}
