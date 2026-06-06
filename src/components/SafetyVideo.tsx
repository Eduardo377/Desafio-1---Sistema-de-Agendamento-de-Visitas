/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Play, ShieldAlert, BadgeCheck, FileText, Info } from "lucide-react";

interface SafetyVideoProps {
  onVideoWatched: () => void;
  hasWatched: boolean;
}

export default function SafetyVideo({
  onVideoWatched,
  hasWatched,
}: SafetyVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoUrl, setVideoUrl] = useState(
    "https://www.youtube.com/embed/A_Zg6UqQylo",
  ); // High quality maritime instruction/harbor style video

  return (
    <div
      id="safety-video-container"
      className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full"
    >
      {/* Header */}
      <div className="bg-slate-900 px-6 py-4 flex items-center justify-between border-b border-slate-850">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
            <ShieldAlert id="icon-security-shield" className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-base">
              Instruções de Segurança
            </h3>
            <p className="text-xs text-slate-400">
              Vídeo obrigatório para qualquer visitante
            </p>
          </div>
        </div>
        {hasWatched ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/20">
            <BadgeCheck className="w-4 h-4" /> Concluído
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-semibold rounded-full border border-amber-500/20 animate-pulse">
            <Info className="w-4 h-4" /> Assistir Vídeo
          </span>
        )}
      </div>

      {/* Video Sandbox Area */}
      <div className="relative flex-1 bg-black aspect-video flex items-center justify-center">
        {!isPlaying ? (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-slate-950/80">
            {/* Visual Shipyard/Port Vibe background decoration */}
            <div
              className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-referrer"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80')",
              }}
            ></div>

            <div className="relative z-20 flex flex-col items-center">
              <button
                id="btn-trigger-safety-video"
                type="button"
                onClick={() => {
                  setIsPlaying(true);
                  onVideoWatched();
                }}
                className="w-16 h-16 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 duration-200 cursor-pointer group"
                aria-label="Reproduzir vídeo de segurança"
              >
                <Play className="w-7 h-7 fill-current ml-1 group-hover:scale-110 transition-transform" />
              </button>

              <h4 className="mt-4 font-bold text-lg text-white">
                Segurança Wilson Sons - Integração Operacional
              </h4>
              <p className="mt-1 text-sm text-slate-300 max-w-sm">
                Entenda os riscos operacionais, o uso correto dos EPIs
                obrigatórios e as normas do terminal marítimo.
              </p>

              <div className="mt-4 flex gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-amber-500" /> Duração:
                  ~2 min
                </span>
                <span className="h-4 w-px bg-slate-700"></span>
                <span>Norma NR-29 e NR-06</span>
              </div>
            </div>
          </div>
        ) : null}

        {/* The Requested Iframe */}
        {isPlaying ? (
          <iframe
            id="iframe-safety-video"
            src={`${videoUrl}?autoplay=1`}
            title="Wilson Sons Safety Video"
            className="w-full h-full border-0 absolute inset-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : null}
      </div>

      {/* Rules Notice card underneath */}
      <div className="p-5 bg-amber-500/5 border-t border-slate-100 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-600" /> Regras Cruciais
            do Terminal
          </h4>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <span>
                <strong>Acesso às Áreas de Risco:</strong> Apenas pessoas
                cadastradas, integradas e com crachá visível.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <span>
                <strong>Calçado Apropriado:</strong> Completamente proibido
                chinelos, sapatilhas ou saltos. Exige-se botas de biqueira de
                aço nas áreas alfandegadas.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <span>
                <strong>Roupas Operacionais:</strong> Não use roupas sem mangas
                (regatas) ou calças curtas (shorts). Calça comprida é
                obrigatória.
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100/80 flex items-center justify-between text-[11px] text-slate-400">
          <span>Wilson Sons Porto & Terminal S.A.</span>
          <span>Versão 1.2</span>
        </div>
      </div>
    </div>
  );
}
