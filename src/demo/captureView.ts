import type { DemoApi } from './buildView'
import type { DemoState } from './types'
import { captureTemplates } from './captureTemplates'
import { demoProjects } from './workspaces'

export function buildCaptureView(s: DemoState, api: DemoApi) {
  const template = captureTemplates.find((item) => item.id === (s.capUser ? s.capTemplate : 'idea')) ?? captureTemplates[1]
  const project = [...demoProjects, ...(s.customProjects ?? [])].find((item) => item.id === s.capProjectId)
  return {
    captureStage: s.capUser ? s.capStage ?? 'templates' : 'input',
    captureTemplate: template,
    captureTemplates: captureTemplates.map((item) => ({ ...item, pick: () => api.selectCaptureTemplate(item.id) })),
    captureBack: () => api.set({ capStage: 'templates', capProjectId: null }),
    captureDestination: project ? `${s.lang === 'en' ? 'Project' : '项目'}：${project.title}` : template.target,
    captureResult: s.captureResult ? { ...s.captureResult, userText: s.captureResult.content } : null,
  }
}
