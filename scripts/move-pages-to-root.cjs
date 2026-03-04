const fs = require('fs')
const path = require('path')

const dist = path.resolve(__dirname, '..', 'dist')
const pagesDir = path.join(dist, 'pages')

if (!fs.existsSync(pagesDir)) {
  console.log('No pages dir in dist; nothing to move.')
  process.exit(0)
}

const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'))
if (files.length === 0) {
  console.log('No HTML files in dist/pages')
  process.exit(0)
}

for (const f of files) {
  const src = path.join(pagesDir, f)
  const dest = path.join(dist, f)
  fs.copyFileSync(src, dest)
  console.log(`Copied ${src} -> ${dest}`)
}

console.log('Pages moved to dist root.')
