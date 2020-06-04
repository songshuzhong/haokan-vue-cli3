module.exports = {
  '*.js': [
    'eslint --fix',
    'prettier --write',
    'git add',
    'npm run unit -- --bail --findRelatedTests --passWithNoTests',
  ],
  '*.json': ['prettier --write', 'git add'],
  '*.vue': ['eslint --fix', 'stylelint --fix', 'prettier --write', 'git add'],
  '*.scss': ['stylelint --fix', 'prettier --write', 'git add'],
}
