// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// TODO: replace with the real GitHub repository once it exists (also update public/admin/config.yml).
const repo = 'https://github.com/OWNER/cartreader-docs';

// https://astro.build/config
export default defineConfig({
	// TODO: production URL (used for the sitemap and canonical links).
	site: 'https://cartreader-docs.pages.dev',
	integrations: [
		starlight({
			title: 'Cart Reader Docs',
			social: [{ icon: 'github', label: 'GitHub', href: repo }],
			editLink: { baseUrl: `${repo}/edit/main/` },
			lastUpdated: true,
			// Each section lists its pages automatically, ordered by `sidebar.order` in the page frontmatter,
			// so pages added through the CMS show up without touching this file.
			sidebar: [
				{ label: 'Getting started', items: [{ autogenerate: { directory: 'getting-started' } }] },
				{ label: 'Hardware', items: [{ autogenerate: { directory: 'hardware' } }] },
				{ label: 'Systems', items: [{ autogenerate: { directory: 'systems' } }] },
				{ label: 'Firmware', items: [{ autogenerate: { directory: 'firmware' } }] },
				{ label: 'Troubleshooting', items: [{ autogenerate: { directory: 'troubleshooting' } }] },
				{ label: 'Contributing', items: [{ autogenerate: { directory: 'contributing' } }] },
			],
		}),
	],
});
