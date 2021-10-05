# Disallows usage of findOne() without a query document

The use of findOne() without a query document is discouraged.

## Rule Details

Examples of **incorrect** code for this rule:

```ts
movies.findOne();
```

Examples of **correct** code for this rule:

```ts
movies.findOne({ title: 'The Room' });
```
