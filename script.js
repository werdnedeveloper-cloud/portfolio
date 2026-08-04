const lines = [
    { prompt: '$', cmd: 'whoami', out: 'desenvolvedor full-stack' },
    { prompt: '$', cmd: 'skills --list', out: 'python · django · react · javascript · html · css' },
    { prompt: '$', cmd: 'status', out: 'aprendendo sempre, entregando sempre' }
];

const el = document.getElementById('termBody');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function renderStatic(){
    el.innerHTML = lines.map(l =>
      `<div class="line"><span class="prompt">${l.prompt}</span><span class="cmd">${l.cmd}</span></div><div class="out">${l.out}</div>`
    ).join('') + '<span class="cursor"></span>';
}

async function typeLine(container, text, speed){
    return new Promise(resolve => {
      let i = 0;
      const span = document.createElement('span');
      span.className = 'cmd';
      container.appendChild(span);
      const timer = setInterval(() => {
        span.textContent += text[i];
        i++;
        if(i >= text.length){ clearInterval(timer); resolve(); }
      }, speed);
    });
}

async function playTerminal(){
    for(const l of lines){
      const lineDiv = document.createElement('div');
      lineDiv.className = 'line';
      const promptSpan = document.createElement('span');
      promptSpan.className = 'prompt';
      promptSpan.textContent = l.prompt;
      lineDiv.appendChild(promptSpan);
      el.appendChild(lineDiv);

      await typeLine(lineDiv, l.cmd, 32);
      await new Promise(r => setTimeout(r, 200));

      const outDiv = document.createElement('div');
      outDiv.className = 'out';
      outDiv.textContent = l.out;
      el.appendChild(outDiv);

      await new Promise(r => setTimeout(r, 350));
    }

    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    el.appendChild(cursor);
}

if(reduceMotion){
    renderStatic();
} else {
    playTerminal();
}