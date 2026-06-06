/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, Mail, Calendar, Clock, Contact, ChevronRight, HelpCircle, ShieldCheck } from 'lucide-react';
import { VisitSchedule } from '../types';

interface VisitorFormProps {
  onSubmit: (schedule: Omit<VisitSchedule, 'id' | 'createdAt' | 'status'>) => void;
  videoWatched: boolean;
}

export default function VisitorForm({ onSubmit, videoWatched }: VisitorFormProps) {
  // Form values
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [motivoVisita, setMotivoVisita] = useState('');
  const [nomeAcompanhante, setNomeAcompanhante] = useState('');
  const [dataAgenda, setDataAgenda] = useState('');
  const [horaAgenda, setHoraAgenda] = useState('');
  const [regrasAceitas, setRegrasAceitas] = useState(false);

  // Error handling
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};

    if (!nome.trim()) tempErrors.nome = 'Nome é obrigatório.';
    if (!email.trim()) {
      tempErrors.email = 'E-mail é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'E-mail inválido.';
    }
    if (!motivoVisita.trim()) tempErrors.motivoVisita = 'Motivo da visita é obrigatório.';
    if (!nomeAcompanhante.trim()) tempErrors.nomeAcompanhante = 'Nome do acompanhante (Host) é obrigatório.';
    if (!dataAgenda) tempErrors.dataAgenda = 'Data da visita é obrigatória.';
    if (!horaAgenda) tempErrors.horaAgenda = 'Horário da visita é obrigatório.';
    if (!regrasAceitas) {
      tempErrors.regrasAceitas = 'Você precisa ler e confirmar que entendeu as regras de vestimenta antes de agendar.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        nome,
        email,
        motivoVisita,
        nomeAcompanhante,
        dataAgenda,
        horaAgenda,
        regrasAceitas,
      });

      // Reset Form fields on success
      setNome('');
      setEmail('');
      setMotivoVisita('');
      setNomeAcompanhante('');
      setDataAgenda('');
      setHoraAgenda('');
      setRegrasAceitas(false);
      setErrors({});
    }
  };

  return (
    <form id="visitor-schedule-form" onSubmit={handleSubmit} className="space-y-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm h-full flex flex-col justify-between">
      <div className="space-y-5">
        <div>
          <h3 className="font-bold text-lg text-slate-900">Solicitar Agendamento</h3>
          <p className="text-xs text-slate-500">Forneça os dados básicos abaixo para obter o seu passe de acesso temporário.</p>
        </div>

        {/* Form fields layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Nome */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="input-visitor-name" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" /> Nome Completo
            </label>
            <input
              id="input-visitor-name"
              type="text"
              placeholder="Digite o seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className={`text-sm px-4 py-2.5 rounded-xl border bg-slate-50 border-slate-200 focus:outline-none focus:border-[#002F6C] focus:bg-white transition-colors duration-150 ${errors.nome ? 'border-red-500 bg-red-50/10' : ''}`}
            />
            {errors.nome && <span className="text-[11px] text-red-500 font-medium">{errors.nome}</span>}
          </div>

          {/* E-mail */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="input-visitor-email" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" /> E-mail de Contato
            </label>
            <input
              id="input-visitor-email"
              type="email"
              placeholder="exemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`text-sm px-4 py-2.5 rounded-xl border bg-slate-50 border-slate-200 focus:outline-none focus:border-[#002F6C] focus:bg-white transition-colors duration-150 ${errors.email ? 'border-red-500 bg-red-50/10' : ''}`}
            />
            {errors.email && <span className="text-[11px] text-red-500 font-medium">{errors.email}</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Motivo da Visita */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="input-visitor-reason" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" /> Motivo da Visita
            </label>
            <input
              id="input-visitor-reason"
              type="text"
              placeholder="Ex: Reunião comercial, entrega de cargas, manutenção..."
              value={motivoVisita}
              onChange={(e) => setMotivoVisita(e.target.value)}
              className={`text-sm px-4 py-2.5 rounded-xl border bg-slate-50 border-slate-200 focus:outline-none focus:border-[#002F6C] focus:bg-white transition-colors duration-150 ${errors.motivoVisita ? 'border-red-500 bg-red-50/10' : ''}`}
            />
            {errors.motivoVisita && <span className="text-[11px] text-red-500 font-medium">{errors.motivoVisita}</span>}
          </div>

          {/* Nome do Acompanhante / Host */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="input-visitor-host" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Contact className="w-3.5 h-3.5 text-slate-400" /> Nome do Acompanhante (Host)
            </label>
            <input
              id="input-visitor-host"
              type="text"
              placeholder="Funcionário que irá te receber na Wilson Sons"
              value={nomeAcompanhante}
              onChange={(e) => setNomeAcompanhante(e.target.value)}
              className={`text-sm px-4 py-2.5 rounded-xl border bg-slate-50 border-slate-200 focus:outline-none focus:border-[#002F6C] focus:bg-white transition-colors duration-150 ${errors.nomeAcompanhante ? 'border-red-500 bg-red-50/10' : ''}`}
            />
            {errors.nomeAcompanhante && <span className="text-[11px] text-red-500 font-medium">{errors.nomeAcompanhante}</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Data */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="input-visitor-date" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> Data Preferencial
            </label>
            <input
              id="input-visitor-date"
              type="date"
              value={dataAgenda}
              onChange={(e) => setDataAgenda(e.target.value)}
              className={`text-sm px-4 py-2.5 rounded-xl border bg-slate-50 border-slate-200 focus:outline-none focus:border-[#002F6C] focus:bg-white transition-colors duration-150 ${errors.dataAgenda ? 'border-red-500 bg-red-50/10' : ''}`}
            />
            {errors.dataAgenda && <span className="text-[11px] text-red-500 font-medium">{errors.dataAgenda}</span>}
          </div>

          {/* Horário */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="input-visitor-time" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" /> Horário Estipulado
            </label>
            <input
              id="input-visitor-time"
              type="time"
              value={horaAgenda}
              onChange={(e) => setHoraAgenda(e.target.value)}
              className={`text-sm px-4 py-2.5 rounded-xl border bg-slate-50 border-slate-200 focus:outline-none focus:border-[#002F6C] focus:bg-white transition-colors duration-150 ${errors.horaAgenda ? 'border-red-500 bg-red-50/10' : ''}`}
            />
            {errors.horaAgenda && <span className="text-[11px] text-red-500 font-medium">{errors.horaAgenda}</span>}
          </div>
        </div>

        {/* Mandatory Safety Checkbox validation */}
        <div className="pt-2">
          <div className={`p-4 rounded-xl border transition-all duration-150 relative ${
            regrasAceitas 
              ? 'bg-emerald-50/35 border-emerald-200' 
              : errors.regrasAceitas 
                ? 'bg-red-50/20 border-red-300 shadow-sm shadow-red-50' 
                : 'bg-amber-50/15 border-amber-100 hover:bg-slate-50'
          }`}>
            <label id="label-safety-checkbox" className="flex items-start gap-3 cursor-pointer select-none">
              <input
                id="checkbox-safety-rules"
                type="checkbox"
                checked={regrasAceitas}
                onChange={(e) => setRegrasAceitas(e.target.checked)}
                className="mt-1 w-4 h-4 text-[#002F6C] focus:ring-[#002F6C] border-slate-300 rounded cursor-pointer accent-slate-900"
              />
              <span className="text-[11px] sm:text-xs text-slate-700 leading-relaxed font-medium">
                Confirmo que entendi as regras: É proibido o uso de regatas, shorts e sapatos abertos. É obrigatório o uso de EPIs (capacete, botas e colete) nas áreas operacionais.
              </span>
            </label>
          </div>
          {errors.regrasAceitas && <p className="text-[11px] text-red-500 font-semibold mt-1.5">{errors.regrasAceitas}</p>}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 mt-6">
        {!videoWatched ? (
          <div className="p-3 bg-indigo-50/35 border border-indigo-100 text-indigo-700 text-xs rounded-xl flex items-center justify-between mb-3 animate-pulse">
            <span>💡 Assista ao vídeo de segurança antes de concluir</span>
            <span className="font-bold uppercase tracking-wider text-[10px]">Recomendado</span>
          </div>
        ) : null}

        <button
          id="btn-submit-visit"
          type="submit"
          className="w-full bg-[#002F6C] hover:bg-[#001D47] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-md shadow-slate-950/10 flex items-center justify-center gap-2 group cursor-pointer hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
        >
          <span>Confirmar Solicitação de Envio</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </form>
  );
}
