import { useMemo, useState } from 'react'
import { ArrowUpRight, WandSparkles, Monitor, Smartphone, LayoutTemplate, Code2, Eye, Plus, Copy, Check, Sparkles } from 'lucide-react'

type Site = { name: string; headline: string; sub: string; button: string; accent: string; kind: string }
const starter: Site = { name: 'NOVA STUDIO', headline: 'Ideas deserve a beautiful place to live.', sub: 'A clean, confident digital home for the next generation of creators.', button: 'Explore the collection', accent: '#9b8cff', kind: 'Studio' }

export default function App() {
  const [prompt, setPrompt] = useState('')
  const [site, setSite] = useState<Site>(starter)
  const [tab, setTab] = useState<'preview'|'code'>('preview')
  const [device, setDevice] = useState<'desktop'|'mobile'>('desktop')
  const [copied, setCopied] = useState(false)
  const [notice, setNotice] = useState('')

  const html = useMemo(() => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${site.name}</title>
<style>*{box-sizing:border-box}body{margin:0;background:#10131b;color:#fff;font-family:Arial,sans-serif}.nav{display:flex;justify-content:space-between;padding:28px 8%;border-bottom:1px solid #ffffff18}.hero{min-height:80vh;display:grid;place-content:center;text-align:center;padding:50px 8%;background:radial-gradient(circle at 50% 30%,${site.accent}33,transparent 55%)}.tag{color:${site.accent};letter-spacing:.2em;text-transform:uppercase;font-size:12px}h1{font-size:clamp(42px,7vw,84px);max-width:900px;line-height:1.02;margin:24px auto}p{color:#b9bdc9;font-size:18px;line-height:1.7;max-width:620px;margin:0 auto 30px}.btn{display:inline-block;background:${site.accent};color:#090b12;padding:15px 24px;border-radius:999px;text-decoration:none;font-weight:bold}</style></head>
<body><nav class="nav"><b>${site.name}</b><span>About　 Work　 Contact</span></nav><main class="hero"><span class="tag">${site.kind} / Independent by design</span><h1>${site.headline}</h1><p>${site.sub}</p><a class="btn" href="#contact">${site.button} ↗</a></main></body></html>`, [site])

  function generate() {
    const p = prompt.trim()
    if (!p) { setNotice('Describe the website you want to create first.'); return }
    const lower = p.toLowerCase()
    const kind = lower.includes('shop') || lower.includes('store') ? 'E-commerce' : lower.includes('portfolio') ? 'Portfolio' : lower.includes('agency') ? 'Agency' : 'Creative studio'
    const name = (p.match(/for\s+([a-z0-9 &'-]+)/i)?.[1] || 'YOUR BRAND').split(/[,.]/)[0].slice(0, 24).toUpperCase()
    setSite({
      name,
      headline: lower.includes('shop') || lower.includes('store') ? 'Find your next favourite thing.' : lower.includes('portfolio') ? 'A body of work built with purpose.' : 'Make your next big idea impossible to ignore.',
      sub: `A thoughtfully designed ${kind.toLowerCase()} website, shaped around this brief: ${p.slice(0, 150)}.`,
      button: lower.includes('shop') || lower.includes('store') ? 'Shop now' : 'Discover more',
      accent: lower.includes('green') ? '#80e0b0' : lower.includes('orange') ? '#ffad73' : '#9b8cff',
      kind
    })
    setTab('preview'); setNotice('Starter layout generated. Refine the copy and style in the editor.')
  }
  async function copyCode() {
    try { await navigator.clipboard.writeText(html); setCopied(true); setTimeout(() => setCopied(false), 1600) }
    catch { setNotice('Clipboard access was blocked. Select and copy the code from the preview panel.') }
  }
  function exportHtml() {
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'eprime-generated-website.html'; a.click()
    URL.revokeObjectURL(url)
  }

  return <div className="app">
    <header className="topbar"><a className="brand" href="#"><span className="brand-mark">E</span><span>E-PRIME <small>WEBSITE STUDIO</small></span></a><div className="top-right"><span className="status-dot"/> LOCAL PREVIEW <a className="github" href="https://github.com/ryaanantojokadavan" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14}/></a></div></header>
    <main className="workspace">
      <aside className="sidebar">
        <div className="eyebrow">WORKSPACE / 001</div><h2>Build something<br/><em>remarkable.</em></h2>
        <p className="muted">Start with a thought. Shape it into a website.</p>
        <label className="field-label" htmlFor="brief">YOUR WEBSITE BRIEF</label>
        <textarea id="brief" value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="A modern online store for a sustainable sneaker brand. Use a bold green palette..." />
        <button className="primary" onClick={generate}><WandSparkles size={17}/> Generate starter <ArrowUpRight size={16}/></button>
        <div className="hint"><Sparkles size={14}/> Prompt generation currently uses a local starter-template engine. Connect an AI provider in a future release.</div>
        {notice && <div className="notice">{notice}</div>}
        <div className="divider"/>
        <div className="section-head"><span>PAGE SETTINGS</span><LayoutTemplate size={15}/></div>
        <label className="field-label" htmlFor="brandname">BRAND NAME</label><input id="brandname" value={site.name} onChange={e=>setSite({...site,name:e.target.value})}/>
        <label className="field-label" htmlFor="headline">HERO HEADLINE</label><textarea className="small-area" id="headline" value={site.headline} onChange={e=>setSite({...site,headline:e.target.value})}/>
        <label className="field-label" htmlFor="sub">DESCRIPTION</label><textarea className="small-area" id="sub" value={site.sub} onChange={e=>setSite({...site,sub:e.target.value})}/>
        <label className="field-label" htmlFor="accent">ACCENT COLOUR</label><div className="color-row"><input id="accent" type="color" value={site.accent} onChange={e=>setSite({...site,accent:e.target.value})}/><code>{site.accent.toUpperCase()}</code></div>
      </aside>
      <section className="canvas">
        <div className="canvas-toolbar"><div className="tabs"><button className={tab==='preview'?'active':''} onClick={()=>setTab('preview')}><Eye size={15}/> Preview</button><button className={tab==='code'?'active':''} onClick={()=>setTab('code')}><Code2 size={15}/> HTML</button></div><div className="toolbar-right"><button className={device==='desktop'?'icon-btn chosen':'icon-btn'} onClick={()=>setDevice('desktop')} aria-label="Desktop preview"><Monitor size={16}/></button><button className={device==='mobile'?'icon-btn chosen':'icon-btn'} onClick={()=>setDevice('mobile')} aria-label="Mobile preview"><Smartphone size={16}/></button><button className="export" onClick={exportHtml}>Export HTML <ArrowUpRight size={14}/></button></div></div>
        <div className="preview-stage">
          {tab==='preview' ? <div className={`site-frame ${device}`}><div className="browser-bar"><span/><span/><span/><small>preview.eprime.studio</small></div><iframe title="Generated website preview" srcDoc={html}/></div> : <div className="code-panel"><div className="code-head"><span>index.html</span><button onClick={copyCode}>{copied?<Check size={14}/>:<Copy size={14}/>} {copied?'Copied':'Copy HTML'}</button></div><pre>{html}</pre></div>}
        </div>
        <div className="canvas-footer"><span><span className="status-dot"/> DRAFT PREVIEW</span><span>Changes update live · Export when ready</span></div>
      </section>
    </main>
    <footer><span>© 2026 E-PRIME GROUP</span><span>BUILDING WHAT COMES NEXT.</span><span>STUDIO / V0.1.0</span></footer>
  </div>
}
