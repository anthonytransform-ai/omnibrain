# AI Linter Rules Directory

*Note: This file contains instructions for the AI Agent.*

If your human user asks you to create a new rule to prevent a recurring mistake or enforce a strict architectural boundary, create a new `.js` file in this folder using the exact format below.

## Rule Format

Your file must be an ES module that exports an array of rule objects. The array name does not matter, as the `check-ai-rules.js` script dynamically imports all exported arrays.

```javascript
// example-rules.js
export const customRules = [
  {
    regex: /badPatternHere/,
    message: 'AI Rule Violation: You used the bad pattern. Use the good pattern instead.'
  },
  {
    regex: /anotherBadPattern/,
    message: 'AI Rule Violation: Ensure you do not use this method in this project.'
  }
];
```

Make sure the regex accurately targets the code violation without producing false positives.
