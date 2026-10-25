import { AgentCursor, AgentLogo, type AgentKind } from './glyphs'

export type AgentStatus = 'approval' | 'running' | 'input' | 'idle'

export type AgentSession = {
  id: string
  agent: AgentKind
  repo: string
  title?: { zh: string; en: string }
  status: AgentStatus
  you?: { zh: string; en: string }
  reply?: { zh: string; en: string }
  tool?: { name: string; arg: string }
  app: string
  ago: { zh: string; en: string }
}

// 原生岛的状态色：等你授权橙、处理中正文色、等待输入蓝、闲置灰。
export const statusColors: Record<AgentStatus, string> = { approval: '#ff9233', running: '#e6e6e6', input: '#4a8dff', idle: '#8e8e93' }

export const initialSessions: AgentSession[] = [
  {
    id: 'island', agent: 'claude', repo: 'void-calendar', title: { zh: 'Island 点击跳转问题', en: 'Island click-through bug' }, status: 'approval',
    you: { zh: '给 void island 增加 AI tab', en: 'Add an AI tab to Void Island' }, tool: { name: 'Bash', arg: 'bun run test' }, app: 'Ghostty', ago: { zh: '刚刚', en: 'now' },
  },
  {
    id: 'backend', agent: 'claude', repo: 'backend', status: 'running',
    you: { zh: '修复同步冲突时的重复写入', en: 'Fix duplicate writes on sync conflicts' }, tool: { name: 'Edit', arg: 'service.rs' }, app: 'iTerm', ago: { zh: '刚刚', en: 'now' },
  },
  {
    id: 'website', agent: 'codex', repo: 'website', title: { zh: '定价页三栏布局', en: 'Three-column pricing' }, status: 'input',
    you: { zh: '把定价页改成三栏布局', en: 'Make the pricing page three columns' },
    reply: { zh: '已改成三栏，手机上改为上下排列。要不要顺便调一下 FAQ 的间距？', en: 'Done: three columns, stacked on phones. Should I tidy the FAQ spacing too?' },
    app: 'Terminal', ago: { zh: '12 分钟', en: '12 min' },
  },
  { id: 'notes', agent: 'claude', repo: 'notes', status: 'idle', app: 'Terminal', ago: { zh: '50 分钟', en: '50 min' } },
]

const statusLabels: Record<AgentStatus, { zh: string; en: string }> = {
  approval: { zh: '等待审批', en: 'Needs approval' },
  running: { zh: '处理中', en: 'Working' },
  input: { zh: '等待输入', en: 'Waiting for you' },
  idle: { zh: '闲置', en: 'Idle' },
}

export function AgentsPanel({ en, sessions, onApprove, onDeny }: {
  en: boolean; sessions: AgentSession[]
  onApprove: (id: string) => void; onDeny: (id: string) => void
}) {
  const t = (value: { zh: string; en: string }) => en ? value.en : value.zh
  const agentName = (agent: AgentKind) => agent === 'claude' ? 'Claude' : 'Codex'
  if (!sessions.length) return <p className="vi-empty">{en ? 'No AI sessions. Start one in your terminal and it shows up here.' : '没有 AI 会话。在终端里开一个，就会出现在这里。'}</p>
  return <ul className="vi-agent-list">
    {sessions.map((session) => <li key={session.id} className={`vi-agent-row vi-agent-${session.status}`}>
      <span className="vi-agent-avatar"><AgentLogo agent={session.agent} px={1.5} busy={session.status === 'running'} dim={session.status === 'idle'} /></span>
      <AgentCursor color={statusColors[session.status]} spinning={session.status === 'running'} blink={session.status === 'approval' || session.status === 'input'} />
      <div className="vi-agent-body">
        <div className="vi-agent-head">
          <strong>{session.repo}{session.title && <> · {t(session.title)}</>}</strong>
          <span className="vi-agent-status" style={{ color: session.status === 'running' || session.status === 'idle' ? undefined : statusColors[session.status] }}>{t(statusLabels[session.status])}</span>
          <span className="vi-agent-meta"><em>{session.app}</em><em>{t(session.ago)}</em></span>
        </div>
        {session.you && <p>{en ? 'You: ' : '你：'}{t(session.you)}</p>}
        {session.reply && <p className="vi-agent-reply">{agentName(session.agent)}{en ? ': ' : '：'}{t(session.reply)}</p>}
        {session.tool && <p className="vi-agent-tool"><b style={{ color: session.status === 'approval' ? statusColors.approval : undefined }}>{session.tool.name}</b><code>{session.tool.arg}</code></p>}
        {session.status === 'approval' && <div className="vi-agent-actions">
          <button type="button" className="vi-agent-allow" onClick={() => onApprove(session.id)}>{en ? 'Allow' : '允许'}</button>
          <button type="button" onClick={() => onDeny(session.id)}>{en ? 'Deny' : '拒绝'}</button>
        </div>}
      </div>
    </li>)}
  </ul>
}
