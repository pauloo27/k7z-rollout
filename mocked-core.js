const defaultValues = {
  base_url: 'https://k7z.db.cafe',
  secret_header: 'Authorization',
  project_id: 'k7z',
};

module.exports = {
  info: (...args) => console.log('LOG:', ...args),
  debug: (...args) => console.debug('DEBUG:', ...args),
  error: (...args) => console.error('ERROR:', ...args),
  setFailed: (...args) => console.error('FAILED:', ...args),
  setOutput: (...args) => console.log('OUTPUT:', ...args),
  getInput: (name) => {
    return process.env[name.toUpperCase()] || defaultValues[name] ||'';
  },
}
