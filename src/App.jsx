import React, { useState } from 'react';
import { Play, Code, Sparkles, Send, RefreshCw } from 'lucide-react';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [activeTab, setActiveTab] = useState('preview');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState(`
    <!DOCTYPE html>
    <html>
      <head><script src="https://cdn.tailwindcss.com"></script></head>
      <body class="bg-slate-900 text-white min-h-screen flex items-center justify-center p-6">
        <div class="text-center space-y-4">
          <div class="text-5xl">⚡</div>
          <h1 class="text-3xl font-bold">VibeBuilder AI Ready</h1>
          <p class="text-slate-400">Enter a prompt on the left to build any web app live!</p>
        </div>
      </body>
    </html>
  `);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);

    try {
      if (!apiKey) {
        // High quality fallback auto shop / custom builder output if no API key is set
        setTimeout(() => {
          setGeneratedHtml(`
            <!DOCTYPE html>
            <html>
              <head>
                <script src="https://cdn.tailwindcss.com"></script>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
              </head>
              <body class="bg-slate-900 text-white font-sans">
                <nav class="p-6 border-b border-slate-800 flex justify-between items-center">
                  <h1 class="text-2xl font-black text-indigo-500">APEX AUTO REPAIR</h1>
                  <button class="bg-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-500">Book Appointment</button>
                </nav>
                <header class="text-center py-20 px-4 max-w-4xl mx-auto space-y-6">
                  <h2 class="text-5xl font-extrabold tracking-tight">Precision Auto Repair & Diagnostics</h2>
                  <p class="text-slate-400 text-lg">Fast, reliable, and honest mechanical services for all vehicle makes and models.</p>
                  <div class="flex justify-center gap-4">
                    <a href="#services" class="bg-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-500">Our Services</a>
                    <a href="#contact" class="bg-slate-800 border border-slate-700 px-6 py-3 rounded-xl font-bold">Call (555) 019-2831</a>
                  </div>
                </header>
              </body>
            </html>
          `);
          setIsGenerating(false);
        }, 1200);
        return;
      }

      // OpenRouter API Call
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            {
              role: 'system',
              content: 'You are an expert web developer. Output ONLY a valid single-file HTML document with Tailwind CSS scripts included. Do not enclose in markdown ticks.'
            },
            { role: 'user', content: prompt }
          ]
        })
      });

      const data = await res.json();
      const code = data.choices[0].message.content;
      setGeneratedHtml(code);
    } catch (err) {
      alert('Generation error: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <div className="w-96 border-r border-slate-800 flex flex-col p-4 bg-slate-900/50 space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-4">
          <Sparkles className="w-6 h-6 text-indigo-400" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            VibeBuilder AI
          </h1>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">OpenRouter API Key (Optional)</label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-or-v1-..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <form onSubmit={handleGenerate} className="flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Build a landing page for an auto shop with services, pricing, and booking form..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 resize-none h-40"
            />
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 transition"
          >
            {isGenerating ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Generate Web App</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Main Preview */}
      <div className="flex-1 flex flex-col">
        <div className="h-14 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/30">
          <div className="flex space-x-2 bg-slate-800/60 p-1 rounded-lg border border-slate-700/50 text-xs">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition ${
                activeTab === 'preview' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition ${
                activeTab === 'code' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Code</span>
            </button>
          </div>
        </div>

        <div className="flex-1 p-4 bg-slate-950">
          {activeTab === 'preview' ? (
            <iframe
              srcDoc={generatedHtml}
              title="Live Preview"
              className="w-full h-full rounded-xl border border-slate-800 bg-white"
            />
          ) : (
            <pre className="w-full h-full p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono text-indigo-300 overflow-auto">
              {generatedHtml}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
