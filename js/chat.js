/**
 * Learn German - AI Chat Assistant
 * Chat dialog powered by Claude API for learning help
 */

(function () {
  'use strict';

  const API_KEY_KEY = 'learnGerman_apiKey';
  let chatOpen = false;
  let chatHistory = [];
  let isStreaming = false;

  function getSystemPrompt() {
    const progress = loadProgress();
    const completedNames = progress.completedLevels
      .map(id => LEVELS.find(l => l.id === id)?.title)
      .filter(Boolean)
      .join(', ');
    const currentLevel = LEVELS.find(l => l.id === progress.currentLevel);

    const knownWords = [];
    for (const level of LEVELS) {
      if (!progress.completedLevels.includes(level.id) && level.id !== progress.currentLevel) continue;
      for (const w of level.words) {
        const stat = progress.wordStats[w.de];
        if (stat) {
          knownWords.push(`${w.de} (${w.en}) — correct: ${stat.timesCorrect}, wrong: ${stat.timesWrong}`);
        }
      }
    }

    return `You are a friendly German language tutor built into a Learn German app. The user is working toward A0 German proficiency.

Current progress:
- Current level: ${progress.currentLevel}/8 — "${currentLevel?.title || 'Complete'}"
- Completed levels: ${completedNames || 'None yet'}
- Words studied: ${knownWords.length > 0 ? '\n' + knownWords.join('\n') : 'None yet'}

Your role:
- Help them understand German words, grammar, and pronunciation
- Quiz them informally if they ask
- Explain differences between similar words
- Give example sentences using words they've learned
- Encourage them and celebrate progress
- Keep responses concise (2-4 sentences usually)
- Use both German and English in your replies
- If they ask about words from future levels, give a brief answer but note they'll learn it properly later

Do NOT:
- Overwhelm with grammar rules they haven't encountered
- Use complex German beyond A0/A1 level
- Give long lectures — keep it conversational`;
  }

  function getApiKey() {
    return localStorage.getItem(API_KEY_KEY) || '';
  }

  function setApiKey(key) {
    localStorage.setItem(API_KEY_KEY, key.trim());
  }

  function createChatElements() {
    const fab = document.createElement('button');
    fab.id = 'chat-fab';
    fab.className = 'chat-fab';
    fab.setAttribute('aria-label', 'Open chat assistant');
    fab.innerHTML = '<span class="chat-fab-icon">?</span>';
    fab.addEventListener('click', toggleChat);
    document.body.appendChild(fab);

    const dialog = document.createElement('div');
    dialog.id = 'chat-dialog';
    dialog.className = 'chat-dialog';
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-label', 'German learning assistant');
    dialog.innerHTML = `
      <div class="chat-header">
        <div class="chat-header-info">
          <span class="chat-header-title">German Tutor</span>
          <span class="chat-header-sub">Ask me anything about German</span>
        </div>
        <div class="chat-header-actions">
          <button class="chat-settings-btn" id="chat-settings-btn" aria-label="API settings" title="API Key Settings">&#9881;</button>
          <button class="chat-close-btn" id="chat-close-btn" aria-label="Close chat">&times;</button>
        </div>
      </div>
      <div class="chat-messages" id="chat-messages" aria-live="polite"></div>
      <div class="chat-api-setup" id="chat-api-setup" style="display: none;">
        <p>Enter your Anthropic API key to enable the AI tutor. Your key is stored locally and never sent anywhere except the Anthropic API.</p>
        <input type="password" id="chat-api-input" class="chat-api-input" placeholder="sk-ant-..." autocomplete="off">
        <div class="chat-api-actions">
          <button class="btn-primary chat-api-save" id="chat-api-save">Save Key</button>
          <button class="btn-secondary chat-api-cancel" id="chat-api-cancel">Cancel</button>
        </div>
      </div>
      <form class="chat-input-area" id="chat-input-area">
        <input type="text" id="chat-input" class="chat-input" placeholder="Ask about German..." autocomplete="off" aria-label="Type your message">
        <button type="submit" class="chat-send-btn" id="chat-send-btn" aria-label="Send message">&#10148;</button>
      </form>
    `;
    document.body.appendChild(dialog);

    document.getElementById('chat-close-btn').addEventListener('click', toggleChat);
    document.getElementById('chat-settings-btn').addEventListener('click', toggleApiSetup);
    document.getElementById('chat-api-save').addEventListener('click', saveApiKeyHandler);
    document.getElementById('chat-api-cancel').addEventListener('click', toggleApiSetup);
    document.getElementById('chat-input-area').addEventListener('submit', handleSend);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && chatOpen) toggleChat();
    });

    if (!getApiKey()) {
      showApiSetup();
    } else {
      addBotMessage("Hallo! I'm your German tutor. Ask me about any word, phrase, or grammar question as you learn. \u{1F1E9}\u{1F1EA}");
    }
  }

  function toggleChat() {
    chatOpen = !chatOpen;
    document.getElementById('chat-dialog').classList.toggle('open', chatOpen);
    document.getElementById('chat-fab').classList.toggle('hidden', chatOpen);
    if (chatOpen) {
      document.getElementById('chat-input').focus();
      scrollMessages();
    }
  }

  function toggleApiSetup() {
    const setup = document.getElementById('chat-api-setup');
    const isHidden = setup.style.display === 'none';
    setup.style.display = isHidden ? 'block' : 'none';
    if (isHidden) {
      document.getElementById('chat-api-input').value = getApiKey();
      document.getElementById('chat-api-input').focus();
    }
  }

  function showApiSetup() {
    setTimeout(() => {
      const setup = document.getElementById('chat-api-setup');
      if (setup) setup.style.display = 'block';
    }, 100);
  }

  function saveApiKeyHandler() {
    const key = document.getElementById('chat-api-input').value.trim();
    if (!key) return;
    setApiKey(key);
    document.getElementById('chat-api-setup').style.display = 'none';
    if (chatHistory.length === 0) {
      addBotMessage("Hallo! I'm your German tutor. Ask me about any word, phrase, or grammar question as you learn. \u{1F1E9}\u{1F1EA}");
    }
  }

  function addBotMessage(text) {
    chatHistory.push({ role: 'assistant', content: text });
    renderMessage('bot', text);
  }

  function addUserMessage(text) {
    chatHistory.push({ role: 'user', content: text });
    renderMessage('user', text);
  }

  function renderMessage(type, text) {
    const container = document.getElementById('chat-messages');
    const msg = document.createElement('div');
    msg.className = `chat-msg chat-msg-${type}`;
    msg.textContent = text;
    container.appendChild(msg);
    scrollMessages();
  }

  function scrollMessages() {
    const container = document.getElementById('chat-messages');
    if (container) container.scrollTop = container.scrollHeight;
  }

  async function handleSend(e) {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text || isStreaming) return;

    const apiKey = getApiKey();
    if (!apiKey) {
      toggleApiSetup();
      return;
    }

    addUserMessage(text);
    input.value = '';

    const apiMessages = chatHistory
      .filter(m => m.role === 'user' || m.role === 'assistant')
      .map(m => ({ role: m.role, content: m.content }));

    isStreaming = true;
    document.getElementById('chat-send-btn').disabled = true;

    const container = document.getElementById('chat-messages');
    const thinking = document.createElement('div');
    thinking.className = 'chat-msg chat-msg-bot chat-thinking';
    thinking.textContent = 'Thinking...';
    container.appendChild(thinking);
    scrollMessages();

    try {
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 300,
          system: getSystemPrompt(),
          messages: apiMessages
        })
      });

      thinking.remove();

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        if (resp.status === 401) {
          addBotMessage('Invalid API key. Please update it in settings (gear icon).');
        } else {
          addBotMessage(`Error: ${err.error?.message || resp.statusText}. Try again.`);
        }
        return;
      }

      const data = await resp.json();
      const reply = data.content?.[0]?.text || 'Sorry, I could not generate a response.';
      addBotMessage(reply);
    } catch {
      thinking.remove();
      addBotMessage('Network error. Please check your connection and try again.');
    } finally {
      isStreaming = false;
      document.getElementById('chat-send-btn').disabled = false;
      input.focus();
    }
  }

  document.addEventListener('DOMContentLoaded', createChatElements);
})();
