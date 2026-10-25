import { useState } from 'react'
import { Glyph } from './glyphs'

/**
 * Git 标签，照原生 GitTab.swift 的源代码管理侧边栏排法：仓库胶囊 + 分支，「更改」分区里提交说明、整宽的提交按钮，
 * 下面已暂存 / 更改两组文件，图谱默认收起。数据是虚构的示例仓库。
 */
type FileChange = { name: string; dir: string; kind: 'M' | 'U' | 'A' }
type Commit = { id: string; zh: string; en: string; hash: string; ago: { zh: string; en: string }; refs?: { label: string; tone: 'branch' | 'tag' | 'side' }[]; lane?: boolean }

const repos = [
  { name: 'void-calendar-website', count: 9, dot: '#f5f5f7' },
  { name: 'snake-game', count: 6, dot: '#4a8dff' },
  { name: 'notes', count: 0, dot: '#8e8e93' },
]
const startCommits: Commit[] = [
  { id: 'c1', zh: '添加暂停菜单', en: 'Add a pause menu', hash: '18367aa', ago: { zh: '3 小时前', en: '3h ago' }, refs: [{ label: 'main', tone: 'branch' }] },
  { id: 'c2', zh: 'HUD 显示分数和关卡', en: 'Show score and level in the HUD', hash: '948fd13', ago: { zh: '5 小时前', en: '5h ago' } },
  { id: 'c3', zh: '修复穿墙时的碰撞判断', en: 'Fix wall collision', hash: '58d98c2', ago: { zh: '20 小时前', en: '20h ago' } },
  { id: 'c4', zh: '合并 feature/levels', en: 'Merge feature/levels', hash: 'f562ea6', ago: { zh: '1 天前', en: '1d ago' }, refs: [{ label: 'v0.2.0', tone: 'tag' }] },
  { id: 'c5', zh: '每一关加快速度', en: 'Speed up each level', hash: '741a45a', ago: { zh: '2 天前', en: '2d ago' }, refs: [{ label: 'feature/levels', tone: 'side' }], lane: true },
  { id: 'c6', zh: '本地记录最高分', en: 'Save the high score locally', hash: '55d116c', ago: { zh: '2 天前', en: '2d ago' } },
]
const fileIcon = (name: string) => name.endsWith('.swift') ? <span className="vi-git-icon vi-git-swift"><Glyph name="swift" /></span>
  : <span className={`vi-git-icon ${name.endsWith('.md') ? 'vi-git-md' : ''}`}><Glyph name="doc" /></span>

export function GitPanel({ en }: { en: boolean }) {
  const [changes, setChanges] = useState<FileChange[]>([
    { name: 'GameView.swift', dir: 'ios/Snake', kind: 'M' }, { name: 'snake.ts', dir: 'src', kind: 'M' },
    { name: 'hud.ts', dir: 'src/ui', kind: 'M' }, { name: 'eat.wav', dir: 'assets', kind: 'U' }, { name: 'README.md', dir: '', kind: 'M' },
  ])
  const [staged, setStaged] = useState<FileChange[]>([{ name: 'score.ts', dir: 'src', kind: 'M' }])
  const [open, setOpen] = useState({ changes: true, staged: true, unstaged: true, graph: false })
  const [message, setMessage] = useState('')
  const [commits, setCommits] = useState(startCommits)
  const [note, setNote] = useState('')

  const toggle = (key: keyof typeof open) => setOpen((value) => ({ ...value, [key]: !value[key] }))
  const stage = (file: FileChange) => { setChanges((list) => list.filter((item) => item !== file)); setStaged((list) => [...list, file]) }
  const unstage = (file: FileChange) => { setStaged((list) => list.filter((item) => item !== file)); setChanges((list) => [...list, file]) }
  const canCommit = message.trim().length > 0 && staged.length + changes.length > 0
  // 没有已暂存的文件时，演示按「始终暂存全部并提交」处理。
  const commit = () => {
    if (!canCommit) return
    const text = message.trim(), files = staged.length ? staged.length : changes.length
    const hash = Math.abs([...text].reduce((h, ch) => Math.imul(h, 31) + ch.charCodeAt(0), 7)).toString(16).padStart(8, '0').slice(0, 8)
    setCommits((list) => [{ id: hash, zh: text, en: text, hash: hash.slice(0, 7), ago: { zh: '刚刚', en: 'now' }, refs: [{ label: 'main', tone: 'branch' }] }, ...list.map((item) => ({ ...item, refs: item.refs?.filter((ref) => ref.label !== 'main') }))])
    if (!staged.length) setChanges([])
    setStaged([])
    setMessage('')
    setNote(en ? `Committed ${hash} · ${files} file${files > 1 ? 's' : ''}` : `已提交 ${hash} · ${files} 个文件`)
  }
  const suggest = () => {
    const names = (staged.length ? staged : changes).map((file) => file.name.replace(/\.\w+$/, ''))
    if (names.length) setMessage(en ? `Update ${names.slice(0, 2).join(' and ')}` : `更新 ${names.slice(0, 2).join('、')}`)
  }
  const group = (key: 'staged' | 'unstaged', title: string, files: FileChange[], action: (file: FileChange) => void, sign: string) => <div className="vi-git-group">
    <button type="button" className="vi-git-group-head" aria-expanded={open[key]} onClick={() => toggle(key)}><Glyph name={open[key] ? 'chevronDown' : 'chevronRight'} /><b>{title}</b><em>{files.length}</em></button>
    {open[key] && <ul>{files.map((file) => <li key={file.name}>
      <button type="button" onClick={() => action(file)} aria-label={`${sign === '+' ? (en ? 'Stage' : '暂存') : (en ? 'Unstage' : '取消暂存')} ${file.name}`}>
        {fileIcon(file.name)}<span className="vi-git-name">{file.name}</span><small>{file.dir}</small><i aria-hidden="true">{sign}</i><b className={`vi-git-kind vi-git-${file.kind}`}>{file.kind}</b>
      </button>
    </li>)}</ul>}
  </div>

  return <div className="vi-git">
    <div className="vi-git-repos">
      <div className="vi-git-chips">{repos.map((repo, index) => <span key={repo.name} className={index === 1 ? 'vi-git-chip vi-git-chip-on' : 'vi-git-chip'}><i style={{ background: repo.dot }} />{repo.name}{repo.count > 0 && <em>{index === 1 ? changes.length + staged.length : repo.count}</em>}</span>)}</div>
      <button type="button" className="vi-git-tool" aria-label={en ? 'Add Git project' : '添加 Git 项目'} title={en ? 'Add Git project' : '添加 Git 项目'}><Glyph name="plus" /></button>
      <button type="button" className="vi-git-tool" aria-label={en ? 'Git settings' : 'Git 设置'} title={en ? 'Git settings' : 'Git 设置'}><Glyph name="gear" /></button>
      <span className="vi-git-branch"><Glyph name="git" />main</span>
      <button type="button" className="vi-git-tool" aria-label={en ? 'Refresh' : '刷新'} title={en ? 'Refresh' : '刷新'}><Glyph name="refresh" /></button>
    </div>
    <div className="vi-git-section">
      <button type="button" className="vi-git-section-head" aria-expanded={open.changes} onClick={() => toggle('changes')}><Glyph name={open.changes ? 'chevronDown' : 'chevronRight'} /><b>{en ? 'CHANGES' : '更改'}</b></button>
      <span className="vi-git-actions">
        <button type="button" aria-label={en ? 'View as tree' : '以树形式查看'} title={en ? 'View as tree' : '以树形式查看'}><Glyph name="list" /></button>
        <button type="button" aria-label={en ? 'Stash changes' : '储藏更改'} title={en ? 'Stash changes…' : '储藏更改…'}><Glyph name="stash" /></button>
        <button type="button" aria-label={en ? 'Commit' : '提交'} title={en ? 'Commit' : '提交'} disabled={!canCommit} onClick={commit}><Glyph name="check" /></button>
      </span>
    </div>
    {open.changes && <>
      <div className="vi-git-message">
        <input value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) { event.preventDefault(); commit() } }} placeholder={en ? 'Message (⌘↵ to commit)' : '提交说明（⌘回车提交）'} aria-label={en ? 'Commit message' : '提交说明'} />
        <button type="button" aria-label={en ? 'Generate commit message' : '生成提交说明'} title={en ? 'Generate commit message' : '生成提交说明'} onClick={suggest}><Glyph name="sparkles" /></button>
      </div>
      <div className={`vi-git-commit ${canCommit ? 'vi-git-commit-on' : ''}`}>
        <button type="button" disabled={!canCommit} onClick={commit}><Glyph name="check" />{en ? 'Commit' : '提交'}</button>
        <i aria-hidden="true" />
        <button type="button" className="vi-git-more" aria-label={en ? 'More commit actions' : '更多提交操作'} onClick={suggest}><Glyph name="chevronDown" /></button>
      </div>
      {note && <p className="vi-git-note" role="status">{note}</p>}
      {group('staged', en ? 'Staged Changes' : '已暂存的更改', staged, unstage, '−')}
      {group('unstaged', en ? 'Changes' : '更改', changes, stage, '+')}
    </>}
    <button type="button" className="vi-git-history" aria-expanded={open.graph} onClick={() => toggle('graph')}><Glyph name={open.graph ? 'chevronDown' : 'chevronRight'} /><b>{en ? 'GRAPH' : '图谱'}</b><small>{commits.length}</small></button>
    {open.graph && <ol className="vi-git-graph">
      {commits.map((item, index) => <li key={item.id} className={item.lane ? 'vi-git-lane' : ''}>
        <span className={`vi-git-dot ${index === 0 ? 'vi-git-head-dot' : ''}`} aria-hidden="true" />
        <span className="vi-git-msg">{item.refs?.map((ref) => <em key={ref.label} className={`vi-git-ref vi-git-ref-${ref.tone}`}>{ref.label}</em>)}{en ? item.en : item.zh}</span>
        <span className="vi-git-meta">alex {item.hash} {en ? item.ago.en : item.ago.zh}</span>
      </li>)}
    </ol>}
  </div>
}
