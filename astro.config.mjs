// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const repo = 'https://github.com/oscrusergroup/docs';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.oscruser.group',
	integrations: [
		starlight({
			title: 'OSCR User Group Docs',
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
