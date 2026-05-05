# Graph Report - Daur  (2026-05-03)

## Corpus Check
- 14 files · ~83,898 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 22 nodes · 9 edges · 1 communities detected
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]

## God Nodes (most connected - your core abstractions)
1. `Card()` - 2 edges
2. `useCollectionHover()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Card()` --calls--> `useCollectionHover()`  [INFERRED]
  src\components\sections\FeaturedCollection\index.tsx → src\components\sections\FeaturedCollection\hooks\useCollectionHover.ts

## Communities

### Community 0 - "Community 0"
Cohesion: 0.5
Nodes (2): Card(), useCollectionHover()

## Knowledge Gaps
- **Thin community `Community 0`** (4 nodes): `Card()`, `useCollectionHover()`, `useCollectionHover.ts`, `index.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Not enough signal to generate questions. This usually means the corpus has no AMBIGUOUS edges, no bridge nodes, no INFERRED relationships, and all communities are tightly cohesive. Add more files or run with --mode deep to extract richer edges._