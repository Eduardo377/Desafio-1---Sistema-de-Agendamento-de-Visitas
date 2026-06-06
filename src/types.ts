/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VisitSchedule {
  id: string;
  nome: string;
  email: string;
  motivoVisita: string;
  nomeAcompanhante: string; // Host / Acompanhante da Wilson Sons
  dataAgenda: string;
  horaAgenda: string;
  regrasAceitas: boolean;
  createdAt: string;
  status: 'Pendente' | 'Aprovado' | 'Concluído';
}

export type TabType = 'MVP' | 'EXPORTER';
