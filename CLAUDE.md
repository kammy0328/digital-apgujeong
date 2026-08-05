# Deploy workflow

This repo auto-deploys via Vercel's GitHub integration on pushes to `main`.

When work on a feature/task branch is complete, verified (typecheck + build pass), and pushed:
merge it into `main` (fast-forward when possible; otherwise merge normally) and push to
`origin/main` right away — do not ask for confirmation first. The user has asked not to be
prompted for this each time. This covers routine merges of finished, verified work only; it is
not blanket permission for force-pushes, history rewrites, or other destructive git operations,
which still require explicit confirmation.
