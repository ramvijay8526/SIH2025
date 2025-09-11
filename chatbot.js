// Simple local chatbot mock with small FAQ matching + multilingual replies
(function(){
  const chatBtn = document.getElementById('chat-toggle') || document.getElementById('chat-toggle-2') || document.getElementById('chat-toggle-3');
  const chat = document.getElementById('chatbot');
  const closeBtn = document.getElementById('close-chat');
  const body = document.getElementById('chat-body');
  const input = document.getElementById('chat-input');
  const send = document.getElementById('send-msg');
  const langSelect = document.getElementById('lang-select');

  function showChat(){ chat.style.display='flex'; }
  function hideChat(){ chat.style.display='none'; }

  // Attach to any chat toggle buttons
  document.querySelectorAll('.chat-toggle').forEach(b=>b.addEventListener('click', showChat));
  if(closeBtn) closeBtn.addEventListener('click', hideChat);

  // Simple multilingual FAQ
  const FAQ = {
    en: {
      'best time': 'Best time to visit Sikkim is Oct–Dec and Mar–May. For rhododendrons, visit Apr–May.',
      'rumtek': 'Rumtek Monastery is near Gangtok and is one of Sikkim\'s largest monasteries. Visiting hours vary; check local listings.',
      'gangtok': 'Gangtok is the capital city, well-connected by road from Bagdogra airport and New Jalpaiguri railhead.'
    },
    hi: {
      'best time': 'सिक्किम आने का अच्छा समय अक्टूबर–दिसंबर और मार्च–मई है। rhododendron के लिए अप्रैल–मई देखें।',
      'rumtek': 'Rumtek मठ गंगटोक के पास है और सिक्किम के सबसे बड़े मठों में से एक है।',
      'gangtok': 'गंगटोक राजधानी है, जो Bagdogra हवाई अड्डे और New Jalpaiguri रेलवे स्टेशन से सड़क मार्ग से जुड़ी है।'
    },
    ne: {
      'best time': 'सिक्किम घुम्नको उत्तम समय अक्टोबर–डिसेम्बर र मार्च–मे हो।',
      'rumtek': 'Rumtek Monastery Gangtok najik maa cha ra yo ek thulo monastery ho.',
      'gangtok': 'Gangtok rajdhani ho ra bagdogra bato ra train bata sajilo sanga puginchha.'
    }
  };

  function appendMessage(text, who='bot'){
    const el = document.createElement('div');
    el.className = who === 'bot' ? 'bot-msg' : 'user-msg';
    el.textContent = text;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  }

  if(send){
    send.addEventListener('click', ()=>{
      const text = input.value && input.value.trim();
      if(!text) return;
      appendMessage(text,'user');
      input.value='';

      const lang = (langSelect && langSelect.value) || 'en';
      const k = text.toLowerCase();
      // Keyword match
      let reply = null;
      if(k.includes('best time')||k.includes('when to visit')||k.includes('season')) reply = FAQ[lang]['best time'];
      else if(k.includes('rumtek')||k.includes('rumtek monastery')) reply = FAQ[lang]['rumtek'];
      else if(k.includes('gangtok')) reply = FAQ[lang]['gangtok'];
      else reply = (lang === 'en') ? 'I can help with permits, places, and travel tips — try: "best time to visit", "Rumtek" or "Gangtok hotels".' : 'मदद के लिए: "best time to visit", "Rumtek" या "Gangtok hotels" टाइप करें।';

      setTimeout(()=>appendMessage(reply,'bot'),600);
    });
  }

})();
