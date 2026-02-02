const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const projectsDir = path.join(__dirname, '..', 'src', 'projects');

function listFiles() {
  const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.md'));
  const missing = [];

  files.forEach(file => {
    const p = path.join(projectsDir, file);
    const content = fs.readFileSync(p, 'utf8');
    try {
      const parsed = matter(content);
      if (!parsed.data || typeof parsed.data.series === 'undefined') {
        missing.push(file);
      }
    } catch (e) {
      console.error('Failed parsing front-matter for', file, e.message);
    }
  });

  if (missing.length === 0) {
    console.log('All project files have a `series` field.');
  } else {
    console.log('Project files missing `series` (edit these and add `series: "Your Series"`):');
    missing.forEach(f => console.log('-', f));
  }
}

listFiles();
