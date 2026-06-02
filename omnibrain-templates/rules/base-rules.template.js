export const baseRules = [
  {
    regex: /console\.log\(/,
    message: 'Base Rule Violation: No console.logs allowed in production code. Use a proper logging library.'
  },
  {
    regex: /TODO:|FIXME:/,
    message: 'Base Rule Violation: Unresolved TODOs or FIXMEs found. Please resolve them or track them in the Vault.'
  }
];
