/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Copy, Check, FileCode, Layers, Info, CheckSquare, MessageSquare } from 'lucide-react';

export default function StructuralExporter() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const textTitles = {
    title: "Agendamento de Visitas - Wilson Sons",
    rulesCheckbox: "Confirmo que entendi as regras: É proibido o uso de regatas, shorts e sapatos abertos. É obrigatório o uso de EPIs (capacete, botas e colete) nas áreas operacionais.",
    footerText: "Projeto desenvolvido para fins educativos na KODIE Academy"
  };

  const lovableJsonTemplate = `{
  "components": [
    {
      "type": "Container",
      "name": "VisitSchedulerApp",
      "style": { "maxWidth": "1200px", "margin": "0 auto", "padding": "2rem" },
      "children": [
        {
          "type": "Header",
          "properties": {
            "title": "Agendamento de Visitas - Wilson Sons"
          }
        },
        {
          "type": "Grid",
          "properties": { "columns": 2 },
          "children": [
            {
              "type": "Form",
              "id": "scheduling-form",
              "children": [
                { "type": "Input", "properties": { "label": "Nome", "required": true, "placeholder": "Digite seu nome completo" } },
                { "type": "Input", "properties": { "label": "E-mail", "type": "email", "required": true, "placeholder": "contato@exemplo.com" } },
                { "type": "Input", "properties": { "label": "Motivo da Visita", "required": true, "placeholder": "Qual o motivo da visita?" } },
                { "type": "Input", "properties": { "label": "Nome do Acompanhante (Host)", "required": true, "placeholder": "Quem receberá você na empresa?" } },
                { "type": "Input", "properties": { "label": "Data da Visita", "type": "date", "required": true } },
                { "type": "Input", "properties": { "label": "Horário da Visita", "type": "time", "required": true } },
                {
                  "type": "Checkbox",
                  "properties": {
                    "required": true,
                    "label": "Confirmo que entendi as regras: É proibido o uso de regatas, shorts e sapatos abertos. É obrigatório o uso de EPIs (capacete, botas e colete) nas áreas operacionais."
                  }
                },
                { "type": "Button", "properties": { "text": "Confirmar Agendamento", "type": "submit" } }
              ]
            },
            {
              "type": "Card",
              "name": "SafetyMediaCard",
              "children": [
                {
                  "type": "Iframe",
                  "properties": {
                    "source": "https://www.youtube.com/embed/A_Zg6UqQylo",
                    "title": "Vídeo de Segurança Obrigatório"
                  }
                }
              ]
            }
          ]
        },
        {
          "type": "Footer",
          "properties": {
            "text": "Projeto desenvolvido para fins educativos na KODIE Academy"
          }
        }
      ]
    }
  ]
}`;

  const appsScriptCode = `/**
 * Google Apps Script - Gatilho de Formulário Wilson Sons
 *
 * Configuração:
 * 1. Vincule este script ao Google Sheets que recebe as respostas.
 * 2. Crie um acionador (Trigger) para a função 'onFormSubmit' no menu "Acionadores" (Triggers)
 *    configurado para executar "Ao enviar formulário" (On form submit).
 */
function onFormSubmit(e) {
  try {
    // 1. Captura as respostas enviadas (compatível com Google Forms ou webhook do Sheets)
    var itemResponses = e.values || [];
    
    // Se o evento vier de um formulário vinculado diretamente à planilha:
    var email = "";
    var nome = "";
    
    if (e.namedValues) {
      // Procura pelas chaves de e-mail e nome ignorando maiúsculas/minúsculas
      for (var key in e.namedValues) {
        if (key.toLowerCase().indexOf("email") > -1 || key.toLowerCase().indexOf("e-mail") > -1) {
          email = e.namedValues[key][0];
        }
        if (key.toLowerCase().indexOf("nome") > -1) {
          nome = e.namedValues[key][0];
        }
      }
    } else if (itemResponses.length > 1) {
      // Fallback por índice caso seja uma linha simples inserida (índice 0: Carimbo de data/hora, 1: Nome, 2: Email, etc.)
      nome = itemResponses[1];
      email = itemResponses[2];
    }
    
    if (!email) {
      Logger.log("Nenhum e-mail de visitante encontrado.");
      return;
    }
    
    // 2. Assunto e corpo do e-mail com as regras obrigatórias reforçadas de segurança
    var assunto = "Confirmação de Agendamento: Wilson Sons";
    
    var corpoTexto = "Olá, " + (nome ? nome : "Visitante") + "!\n\n" +
      "Seu agendamento foi registrado com sucesso em nossa base de controle temporário.\n\n" +
      "⚠️ REFORÇO IMPORTANTE DAS REGRAS DE SEGURANÇA:\n" +
      "--------------------------------------------------\n" +
      "• Proibido: Uso de regatas, shorts e sapatos abertos.\n" +
      "• Obrigatório: Uso de EPIs em áreas específicas (Capacete, botas, colete).\n" +
      "--------------------------------------------------\n\n" +
      "O não cumprimento dessas exigências impedirá o seu acesso físico aos terminais operacionais.\n\n" +
      "Atenciosamente,\n" +
      "Segurança Corporativa - Wilson Sons\n" +
      "Projeto desenvolvido para fins educativos na KODIE Academy";
      
    // 3. Envia o e-mail usando o serviço do Gmail / MailApp do Google Apps Script
    MailApp.sendEmail({
      to: email,
      subject: assunto,
      body: corpoTexto
    });
    
    Logger.log("E-mail de confirmação enviado com sucesso para: " + email);
  } catch (error) {
    Logger.log("Erro ao processar envio: " + error.toString());
  }
}`;

  return (
    <div id="exporter-layout" className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
      <div className="mb-6">
        <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#002F6C]" /> Estrutura Pronta para Low-Code
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Copie e cole as estruturas de componentes, blocos de texto literais obrigatórios ou configurações diretamente na sua plataforma preferencial (Lovable, Builder.io, etc.).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Texts and specifications */}
        <div className="space-y-6">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-sky-600" /> Como Utilizar em Plataformas Low-Code
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 list-decimal list-inside">
              <li>Crie uma nova página em branco no Lovable ou Builder.io.</li>
              <li>Divida o layout principal em **duas colunas** (Coluna Form / Coluna Vídeo).</li>
              <li>Cole individualmente os blocos literais nos campos indicados abaixo para garantir conformidade perfeita com as diretrizes da KODIE Academy.</li>
              <li>Configure o checkbox de segurança como **obrigatório (required)**.</li>
            </ul>
          </div>

          {/* Copyable literal texts */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Textos Obrigatórios (Copiar de forma literal)</h4>
            
            {/* Main Title */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-150 relative">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Título da Interface</span>
                <button
                  id="btn-copy-title"
                  onClick={() => copyToClipboard(textTitles.title, 'title')}
                  className="text-slate-500 hover:text-slate-800 flex items-center gap-1 text-[11px] font-medium"
                >
                  {copiedSection === 'title' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedSection === 'title' ? 'Copiado' : 'Copiar'}
                </button>
              </div>
              <p className="text-sm font-semibold text-[#002F6C]">{textTitles.title}</p>
            </div>

            {/* Checkbox Rules */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-150 relative">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Texto do Checkbox</span>
                <button
                  id="btn-copy-rules"
                  onClick={() => copyToClipboard(textTitles.rulesCheckbox, 'rules')}
                  className="text-slate-500 hover:text-slate-800 flex items-center gap-1 text-[11px] font-medium"
                >
                  {copiedSection === 'rules' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedSection === 'rules' ? 'Copiado' : 'Copiar'}
                </button>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-semibold">{textTitles.rulesCheckbox}</p>
            </div>

            {/* Footer Text */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-150 relative">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Texto do Footer</span>
                <button
                  id="btn-copy-footer"
                  onClick={() => copyToClipboard(textTitles.footerText, 'footer')}
                  className="text-slate-500 hover:text-slate-800 flex items-center gap-1 text-[11px] font-medium"
                >
                  {copiedSection === 'footer' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedSection === 'footer' ? 'Copiado' : 'Copiar'}
                </button>
              </div>
              <p className="text-xs font-mono text-slate-600 italic font-semibold">{textTitles.footerText}</p>
            </div>
          </div>
        </div>

        {/* JSON Hierarchy View */}
        <div className="flex flex-col">
          <div className="bg-slate-900 rounded-xl border border-slate-850 p-4 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-800 mb-3">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-semibold text-slate-200">Estrutura de Blocos JSON (Lovable/Builder.io-Friendly)</span>
                </div>
                <button
                  id="btn-copy-json"
                  onClick={() => copyToClipboard(lovableJsonTemplate, 'json')}
                  className="text-slate-400 hover:text-white flex items-center gap-1 text-xs font-medium bg-slate-800 px-2.5 py-1 rounded"
                >
                  {copiedSection === 'json' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedSection === 'json' ? 'Copiado' : 'Copiar JSON'}
                </button>
              </div>
              <pre className="text-[11px] text-slate-300 font-mono overflow-auto max-h-[380px] leading-relaxed select-all">
                {lovableJsonTemplate}
              </pre>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <span className="p-1.5 bg-amber-500/10 text-amber-500 rounded text-[9px] font-bold">Dica</span>
              <span>Esta árvore de componentes traduz idealmente os requisitos de container, formulários e regras.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Google Apps Script Block Section */}
      <div className="mt-8 pt-8 border-t border-slate-200">
        <div className="bg-slate-900 rounded-xl border border-slate-850 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-4">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-sky-400" /> Integração Planilhas (Google Apps Script)
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Gatilho <code className="bg-slate-800 text-slate-300 px-1 py-0.5 rounded text-[11px]">onFormSubmit(e)</code> para enviar e-mails automatizados aos visitantes ao preencherem o formulário no Sheets.
              </p>
            </div>
            <button
              id="btn-copy-apps-script"
              onClick={() => copyToClipboard(appsScriptCode, 'apps_script')}
              className="text-slate-400 hover:text-white flex items-center gap-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded transition-colors shrink-0 self-start sm:self-auto"
            >
              {copiedSection === 'apps_script' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copiedSection === 'apps_script' ? 'Copiado para Área' : 'Copiar Script'}
            </button>
          </div>
          <pre className="text-[11px] text-slate-300 font-mono overflow-auto max-h-[320px] leading-relaxed select-all whitespace-pre-wrap">
            {appsScriptCode}
          </pre>
        </div>
      </div>
    </div>
  );
}
