# OSCR User Group Docs

Documentation site built with [Astro Starlight](https://starlight.astro.build). Content is Markdown in
`src/content/docs/`, editable in the browser through [Sveltia CMS](https://sveltiacms.app) at `/admin/`.

## Commands

| Command        | Action                                        |
| :------------- | :-------------------------------------------- |
| `pnpm install` | Install dependencies                          |
| `pnpm dev`     | Dev server at `localhost:4321`                |
| `pnpm build`   | Build to `./dist/` (includes Pagefind search) |
| `pnpm preview` | Preview the production build                  |
| `pnpm run deploy` | Build and deploy with Wrangler (manual)    |

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

The site is served at <https://docs.oscruser.group>; CMS sign-in goes through the auth Worker at <https://sveltia-cms-auth.oscruser.group>.

1. **GitHub repo**: push this project to [oscrusergroup/docs](https://github.com/oscrusergroup/docs), with `main` as the default branch.
2. **Cloudflare Workers**: connect the repo (Workers Builds). Build command `pnpm build`, deploy
   command `npx wrangler deploy`. `wrangler.jsonc` serves `dist/` as static assets on the
   `docs.oscruser.group` custom domain. Turn on preview builds for non-production branches so reviewers
   get a preview link on every CMS pull request.
3. **CMS login**: deploy [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) as a
   Cloudflare Worker, create a GitHub OAuth App with callback `https://<worker>/callback`, and set
   `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` and `ALLOWED_DOMAINS` to `docs.oscruser.group` on the Worker.
   Its URL is set as `backend.base_url` in `public/admin/config.yml`.
4. **Editors**: invite them as repo collaborators with write access. With `publish_mode:
   editorial_workflow`, their saves open pull requests instead of committing to `main`.
