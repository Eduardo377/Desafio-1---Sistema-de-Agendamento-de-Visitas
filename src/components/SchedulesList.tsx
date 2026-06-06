/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, Clock, User, Mail, ShieldCheck, Trash2, FileText, BadgeAlert } from 'lucide-react';
import { VisitSchedule } from '../types';

interface SchedulesListProps {
  schedules: VisitSchedule[];
  onDelete: (id: string) => void;
}

export default function SchedulesList({ schedules, onDelete }: SchedulesListProps) {
  return (
    <div id="schedules-list-container" className="bg-slate-50 rounded-2xl border border-slate-100 p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Registros Salvos</h3>
          <p className="text-xs text-slate-500">Agendamentos armazenados em sandbox de testes</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-200/60 text-slate-700 rounded-full">
          Total: {schedules.length}
        </span>
      </div>

      {schedules.length === 0 ? (
        <div className="text-center py-10 px-4 bg-white rounded-xl border border-dashed border-slate-200">
          <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <h4 className="text-xs font-semibold text-slate-600">Nenhum agendamento cadastrado</h4>
          <p className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto">
            Preencha o formulário e aceite as regras de segurança para ver o passe gerado aqui.
          </p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
          {schedules.map((item) => (
            <div
              key={item.id}
              id={`schedule-item-${item.id}`}
              className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative hover:border-slate-300 transition-colors group"
            >
              <button
                id={`btn-delete-schedule-${item.id}`}
                onClick={() => onDelete(item.id)}
                className="absolute top-4 right-4 text-slate-300 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50/50 transition-colors"
                title="Excluir agendamento"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full uppercase">
                  ✓ Regras Aceitas
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 bg-[#002F6C]/5 text-[#002F6C] border border-[#002F6C]/10 rounded-full uppercase">
                  {item.status}
                </span>
                <span className="text-[10px] text-slate-400 font-mono ml-auto mr-7">
                  Ref: #{item.id.slice(0, 5)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-slate-400 text-[10px] font-medium uppercase tracking-wider">Visitante</p>
                  <p className="font-semibold text-slate-900 flex items-center gap-1 mt-0.5">
                    <User className="w-3.5 h-3.5 text-slate-400" /> {item.nome}
                  </p>
                  <p className="text-slate-500 font-mono text-[11px] flex items-center gap-1 mt-0.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" /> {item.email}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400 text-[10px] font-medium uppercase tracking-wider">Acompanhante / Executivo Host</p>
                  <p className="font-semibold text-slate-900 mt-0.5">
                    {item.nomeAcompanhante}
                  </p>
                  <p className="text-slate-500 mt-0.5">
                    <strong>Motivo:</strong> {item.motivoVisita}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded">
                    <Calendar className="w-3 h-3 text-slate-400" /> {item.dataAgenda}
                  </span>
                  <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded">
                    <Clock className="w-3 h-3 text-slate-400" /> {item.horaAgenda}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">
                  Criado em: {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
