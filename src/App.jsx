import React, { useState } from 'react';
import { Play, Code, Layout, Sparkles, Send, RefreshCw } from 'lucide-react';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [activeTab, setActiveTab] = useState('preview');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState(`
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-slate-900 text-white min-h-screen flex items-center justify-center p-4">
        <div class="text-center space-y-4">
          <div class="inline-block p-4 bg-indigo-600/20 rounded-full text-indigo-400 mb-2">
            🚀
          </div>
          <h1 class="text-3xl font-bold">Welcome to VibeBuilder AI</h1>
          <p class="text-slate-400 max-w-md">Type a prompt in the left sidebar to generate real-time web applications!</p>
        </div>
      </body>
    </html>
  `);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);

    // Simulated fast generation
    setTimeout(() => {
      setGeneratedHtml(`
        <!DOCTYPE html>
        <html>
          <head>
            <script src="https://cdn.tailwindcss.com"></script>
          </head>
          <body class="bg-slate-900 text-white min-h-screen flex flex-col items-center justify-center p-6">
            <div class="max-w-md w-full bg-slate-800 border border-slate-700 rounded-2xl p-6 text-center space-y-6 shadow-xl">
              <h2 class="text-2xl font-bold text-white">Interactive App Ready</h2>
              <p class="text-slate-400 text-sm">Generated prompt: "${prompt}"</p>
              <div class="bg-slate-900 p-6 rounded-xl border border-slate-700">
                <span class="text-5xl font-extrabold text-indigo-400">42</span>
              </div>
              <button onclick="alert('Action triggered!')" class="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-white transition">
                Interactive Action
              </button>
            </div>
          </body>
        </html>
      `);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* Sidebar / Chat */}
      <div className="w-1/3 min-w-[320px] border-r border-slate-800 flex flex-col justify-between p-4 bg-slate-900/50">
        <div className="space-y-6">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-4">
            <Sparkles className="w-6 h-6 text-indigo-400" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              VibeBuilder AI
            </h1>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/50 text-sm text-slate-300">
            <p className="font-medium text-slate-200">Welcome!</p>
            <p className="mt-1 text-slate-400">What web app are we vibe-coding today?</p>
          </div>
        </div>

        <form onSubmit={handleGenerate} className="mt-auto relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Build a clean counter, landing page, or dashboard..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 pr-12 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 resize-none h-24"
          />
          <button
            type="submit"
            disabled={isGenerating}
            className="absolute right-3 bottom-4 p-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white rounded-lg transition"
          >
            {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </form>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 flex flex-col">
        {/* Navigation Bar */}
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

        {/* Live Display Window */}
        <div className="flex-1 p-4 bg-slate-950">
          {activeTab === 'preview' ? (
            <iframe
              srcDoc={generatedHtml}
              title="Live Preview"
              className="w-full h-full rounded-xl border border-slate-800 bg-slate-900"
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
