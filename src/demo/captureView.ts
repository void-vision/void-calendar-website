import type { DemoApi } from './buildView'
import type { DemoState } from './types'
import { captureTemplates, captureDestinations } from './captureTemplates'
import { demoProjects } from './workspaces'
import { captureTitleWithTags, parseCaptureText } from './captureParser'

export function buildCaptureView(s: DemoState, api: DemoApi) {
  const template = captureTemplates.find((item) => item.id === (s.capUser ? s.capTemplate : 'todo')) ?? captureTemplates[0]
  const projects = [...demoProjects, ...s.customProjects]
  const project = projects.find((item) => item.id === s.capProjectId)
  const parsed = parseCaptureText(s.capVal, template.id === 'box' ? 'timebox' : 'task')
  return {
    captureStage: s.capUser ? s.capStage : s.t < 1400 ? 'templates' : 'input',
    captureTemplate: template,
    captureTemplates: captureTemplates.map((item) => ({ ...item, pick: () => api.selectCaptureTemplate(item.id) })),
    captureDestinations: captureDestinations.map((item) => ({ ...item, pick: () => api.openCaptureDestination(item.id) })),
    captureBack: () => api.set({ capStage: 'templates', capProjectId: null, capError: '' }),
    captureDestination: project ? `${s.lang === 'en' ? 'Project' : '项目'}：${project.title}` : template.target,
    captureProjects: projects.map((item) => ({ id: item.id, title: item.title })),
    capBody: s.capBody,
    capProjectId: s.capProjectId ?? '',
    capPriority: s.capPriority,
    capDay: s.capDay,
    capStart: s.capStart,
    capEnd: s.capEnd,
    capError: s.capError,
    captureRecognized: parsed.durationMinutes == null ? '' : `${parsed.durationMinutes} min`,
    captureCanSave: template.id === 'idea' ? !!s.capVal.trim() : !!captureTitleWithTags(parsed),
    onCapBody: (e: { target: { value: string } }) => api.set({ capBody: e.target.value }),
    onCapProject: (e: { target: { value: string } }) => api.set({ capProjectId: e.target.value || null }),
    onCapPriority: (e: { target: { value: string } }) => api.set({ capPriority: Number(e.target.value) }),
    onCapDay: (e: { target: { value: string } }) => api.set({ capDay: Number(e.target.value), capError: '' }),
    onCapStart: (e: { target: { value: string } }) => api.set({ capStart: e.target.value, capError: '' }),
    onCapEnd: (e: { target: { value: string } }) => api.set({ capEnd: e.target.value, capError: '' }),
    captureResult: s.captureResult ? { ...s.captureResult, userText: s.captureResult.content } : null,
  }
}
