module.exports = {
  '*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --fix', 'eslint'],
  '**/*.ts?(x)': () => 'npm run build-types',
  '*.json': ['prettier --write']
};
