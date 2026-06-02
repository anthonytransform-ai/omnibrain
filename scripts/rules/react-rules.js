export const reactRules = [
  {
    regex: /useState\([^)]+\)/,
    // Note: this is a simple naive example of a framework-specific rule
    message: 'React Rule Reminder: Ensure that complex state is managed via useReducer or external state management if it involves multiple sub-values.'
  },
  {
    regex: /useEffect\(\s*\(\)\s*=>\s*\{[^}]*\}\s*\)/,
    message: 'React Rule Violation: useEffect missing dependency array. This can cause infinite loops.'
  }
];
