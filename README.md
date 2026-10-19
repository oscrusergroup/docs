# Cart Reader Docs

Documentation site built with [Astro Starlight](https://starlight.astro.build). Content is Markdown in
`src/content/docs/`, editable in the browser through [Sveltia CMS](https://sveltiacms.app) at `/admin/`.

## Commands

| Command        | Action                                        |
| :------------- | :-------------------------------------------- |
| `pnpm install` | Install dependencies                          |
| `pnpm dev`     | Dev server at `localhost:4321`                |
| `pnpm build`   | Build to `./dist/` (includes Pagefind search) |
| `pnpm preview` | Preview the production build                  |

## Layout

```
src/content/docs/<section>/*.md   pages (sidebar order via `sidebar.order` frontmatter)
src/assets/docs/                  images uploaded through the CMS
src/pages/admin/index.astro       Sveltia CMS page (loads the editor)
public/admin/config.yml           Sveltia CMS settings: backend, collections, fields
```

Sidebar sections autogenerate from folders in `astro.config.mjs`. A new section needs a folder, a
sidebar entry there, and a matching collection in `public/admin/config.yml`.

## Editing locally with the CMS

Run `pnpm dev`, open <http://localhost:4321/admin/> in Chrome or Edge, and choose
**Work with Local Repository**, then select this folder. Edits are written straight to disk.

## Deployment setup (one-time)

Replace the `OWNER` placeholders in `astro.config.mjs` and `public/admin/config.yml` first.

1. **GitHub repo**: push this project, with `main` as the default branch.
2. **Cloudflare Pages**: connect the repo. Build command `pnpm build`, output `dist`. PR preview
   deployments are on by default, so reviewers get a preview link on every CMS pull request.
3. **CMS login**: deploy [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) as a
   Cloudflare Worker, create a GitHub OAuth App with callback `https://<worker>/callback`, and set
   `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` and `ALLOWED_DOMAINS` (your docs domain) on the Worker.
   Put the Worker URL in `backend.base_url`.
4. **Editors**: invite them as repo collaborators with write access. With `publish_mode:
   editorial_workflow`, their saves open pull requests instead of committing to `main`.
