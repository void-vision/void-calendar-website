import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const args = process.argv.slice(2)
const product = resolve(args.find((arg) => !arg.startsWith('--')) ?? resolve(root, '../void-calendar'))
const sources = [
  ['app/src/domain/tasks/capture-parser.ts', 'src/demo/captureParser.ts'],
  ['app/src/domain/assistant/scheduling-style.ts', 'src/demo/schedulingStyle.ts'],
]
let changed = false
for (const [source, destination] of sources) {
  const expected = `// Synced from void-calendar/${source}. See docs/demo-parity.md.\n${await readFile(resolve(product, source), 'utf8')}`
  if (args.includes('--check')) {
    if (expected !== await readFile(resolve(root, destination), 'utf8')) {
      console.error(`Product source changed: ${source}. Run bun run demo:sync and review the demo.`)
      changed = true
    }
  } else {
    await writeFile(resolve(root, destination), expected)
    console.log(`Synced ${destination}`)
  }
}
if (changed) process.exitCode = 1
else console.log(args.includes('--check') ? 'Demo product sources match.' : 'Review Capture UI and run bun test src/demo.')
