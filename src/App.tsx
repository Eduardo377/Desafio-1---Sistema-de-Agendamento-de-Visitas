/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  Building2,
  Terminal,
  HelpCircle,
  Video,
  CheckCircle2,
  CodeXml,
  Grid3X3,
  FileCheck,
  Sparkles,
  BadgeHelp,
  Check,
  Copy,
  Plus,
} from "lucide-react";
import { VisitSchedule, TabType } from "./types";
import SafetyVideo from "./components/SafetyVideo";
import VisitorForm from "./components/VisitorForm";
import SchedulesList from "./components/SchedulesList";
import StructuralExporter from "./components/StructuralExporter";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("MVP");
  const [schedules, setSchedules] = useState<VisitSchedule[]>([]);
  const [videoWatched, setVideoWatched] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "info" | "error";
  } | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("wilson_sons_schedules");
    if (stored) {
      try {
        setSchedules(JSON.parse(stored));
      } catch (e) {
        console.error("Erro ao carregar agendamentos do localStorage", e);
      }
    }
  }, []);

  const triggerToast = (
    message: string,
    type: "success" | "info" | "error" = "success",
  ) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const handleCreateSchedule = async (
    formData: Omit<VisitSchedule, "id" | "createdAt" | "status">,
  ) => {
    const newSchedule: VisitSchedule = {
      ...formData,
      id: Math.random().toString(36).substring(2, 11),
      createdAt: new Date().toISOString(),
      status: "Pendente",
    };

    // 1. Atualiza a interface localmente primeiro para o usuário não ficar esperando
    const updated = [newSchedule, ...schedules];
    setSchedules(updated);
    localStorage.setItem("wilson_sons_schedules", JSON.stringify(updated));

    // 2. Dispara o POST silencioso para o seu Web App no Google Sheets
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbyW7NhycFiVgEGSdL107Hsebc5XZfUwe7nWYdF2FaedhNusILvM5KyGAUja5uJPHyr7Yw/exec",
        {
          method: "POST",
          body: JSON.stringify(formData),
        },
      );
      triggerToast("✓ Solicitação integrada e salva na Planilha!");
    } catch (error) {
      console.error(error);
      triggerToast(
        "Salvo localmente, mas houve erro ao conectar com o Google Sheets.",
        "error",
      );
    }
  };

  const handleDeleteSchedule = (id: string) => {
    const updated = schedules.filter((s) => s.id !== id);
    setSchedules(updated);
    localStorage.setItem("wilson_sons_schedules", JSON.stringify(updated));
    triggerToast("Agendamento removido da memória do protótipo.", "info");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans relative antialiased selección-modern">
      {/* Toast Notification */}
      {toast && (
        <div
          id="toast-notification"
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-lg border max-w-sm transition-all animate-bounce ${
            toast.type === "success"
              ? "bg-emerald-900 text-emerald-100 border-emerald-800"
              : toast.type === "info"
                ? "bg-slate-900 text-slate-100 border-slate-800"
                : "bg-red-900 text-red-100 border-red-800"
          }`}
        >
          <div className="p-1 rounded bg-white/10">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <p className="text-xs font-semibold leading-snug">{toast.message}</p>
        </div>
      )}

      {/* Main Branding Header Bar */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40 shadow-sm backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo and App Title */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#002F6C] flex items-center justify-center text-white shadow-md shadow-slate-950/10">
                <Building2 id="main-brand-logo" className="w-6 h-6 shrink-0" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded uppercase">
                    Port & Logística
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    MVP Sandbox
                  </span>
                </div>
                <h1 className="text-lg font-bold text-slate-900 leading-tight">
                  Agendamento de Visitas - Wilson Sons
                </h1>
              </div>
            </div>

            {/* Tab switchers/Togglers */}
            <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200">
              <button
                id="tab-btn-mvp"
                onClick={() => setActiveTab("MVP")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeTab === "MVP"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                <Grid3X3 className="w-4 h-4 text-[#002F6C]" />
                <span>Interativo</span>
              </button>
              <button
                id="tab-btn-exporter"
                onClick={() => setActiveTab("EXPORTER")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeTab === "EXPORTER"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                <CodeXml className="w-4 h-4 text-amber-500" />
                <span>Gerador Low-Code</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Intro banner */}
      <section className="bg-gradient-to-r from-[#002F6C] to-[#001838] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#001D47]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-bold rounded-full border border-amber-500/20 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" /> Portal de Segurança
                Integrada
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Regras de Acesso e Credenciamento de Visitantes
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Este sistema agiliza a liberação na portaria dos terminais
                alfandegados da Wilson Sons. Os visitantes devem
                obrigatoriamente preencher os dados, assistir às diretrizes de
                segurança e estar em conformidade física antes de receberem o
                crachá de livre trânsito.
              </p>
            </div>

            {/* Context Widget Card */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 md:max-w-xs shrink-0 backdrop-blur-sm self-start md:self-auto">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                📌 MVP Instrucional
              </h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Desenvolva o checkout visual para o seu trabalho rapidamente.
                Use a aba "Gerador Low-Code" para copiar os blocos requeridos de
                forma integral!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "MVP" ? (
          <div className="space-y-8 animate-fade-in">
            {/* Split Form / Safety Info */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Aspect: Video Panel & Safe instructions (5 cols) */}
              <div className="lg:col-span-5 flex flex-col">
                <SafetyVideo
                  onVideoWatched={() => {
                    setVideoWatched(true);
                    triggerToast(
                      "Obrigado! Vídeo de segurança validado.",
                      "info",
                    );
                  }}
                  hasWatched={videoWatched}
                />
              </div>

              {/* Right Aspect: Input Form panel (7 cols) */}
              <div className="lg:col-span-7 flex flex-col">
                <VisitorForm
                  onSubmit={handleCreateSchedule}
                  videoWatched={videoWatched}
                />
              </div>
            </div>

            {/* Bottom section: List of local entries for live MVP simulation */}
            <SchedulesList
              schedules={schedules}
              onDelete={handleDeleteSchedule}
            />
          </div>
        ) : (
          <div className="animate-fade-in">
            <StructuralExporter />
          </div>
        )}
      </main>

      {/* Mandatory Footer written EXACTLY as requested */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8 px-4 sm:px-6 lg:px-8 text-center mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-orange-600/10 text-orange-500 border border-orange-500/10 flex items-center justify-center font-bold">
              W
            </div>
            <span className="text-slate-400 font-medium">
              Wilson Sons Portal Administrativo
            </span>
          </div>

          <div
            id="mandatory-footer-container"
            className="py-2.5 px-4 bg-slate-900 border border-slate-800 rounded-lg text-amber-500 font-semibold tracking-wide shadow-inner text-center"
          >
            Projeto desenvolvido para fins educativos na KODIE Academy
          </div>

          <p className="text-slate-500 text-[11px]">
            &copy; 2026. Todos os direitos reservados para fins de simulação.
          </p>
        </div>
      </footer>
    </div>
  );
}