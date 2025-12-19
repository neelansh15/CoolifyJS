import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'CoolifyJS',
  description: 'A TypeScript SDK for the Coolify API',
  base: '/CoolifyJS/',
  
  head: [
    ['link', { rel: 'icon', href: '/coolifyjs/favicon.ico' }],
    ['style', {}, `
      :root {
        --vp-c-brand: #6366f1;
        --vp-c-brand-light: #818cf8;
        --vp-c-brand-lighter: #a5b4fc;
        --vp-c-brand-dark: #4f46e5;
        --vp-c-brand-darker: #4338ca;
        
        --vp-c-brand-1: var(--vp-c-brand);
        --vp-c-brand-2: var(--vp-c-brand-light);
        --vp-c-brand-3: var(--vp-c-brand-lighter);
      }

      .VPHome {
        padding: 0 !important;
      }

      .VPHero {
        padding-top: 48px;
        padding-bottom: 48px;
      }

      .VPHero .name {
        font-size: 3.5rem;
        font-weight: 700;
        background: linear-gradient(120deg, var(--vp-c-brand) 0%, var(--vp-c-brand-light) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .VPHero .text {
        font-size: 1.5rem;
        color: var(--vp-c-text-2);
      }

      .VPFeatures {
        padding: 48px 24px;
      }

      .VPFeature {
        border: 1px solid var(--vp-c-divider);
        border-radius: 8px;
        padding: 24px;
        transition: all 0.2s;
      }

      .VPFeature:hover {
        border-color: var(--vp-c-brand);
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.1);
      }

      .VPHome .VPFeatures .VPFeature .title {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--vp-c-text-1);
      }

      .VPHome .VPFeatures .VPFeature .details {
        color: var(--vp-c-text-2);
        line-height: 1.6;
      }

      .vp-code-group .tabs {
        border-radius: 8px 8px 0 0;
      }

      .vp-code-group .blocks {
        border-radius: 0 0 8px 8px;
      }

      .badge {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        font-size: 0.875rem;
        font-weight: 500;
        border-radius: 9999px;
        background-color: var(--vp-c-brand);
        color: white;
      }
    `],
  ],

  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API Reference', link: '/api/' },
      { text: 'Examples', link: '/examples/' },
      { text: 'Reference', link: '/reference/' },
      {
        text: 'GitHub',
        link: 'https://github.com/neelansh15/coolifyjs',
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Configuration', link: '/guide/configuration' },
            { text: 'Error Handling', link: '/guide/error-handling' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Overview', link: '/api/' },
            { text: 'Applications', link: '/api/applications' },
            { text: 'Databases', link: '/api/databases' },
            { text: 'Deployments', link: '/api/deployments' },
            { text: 'Services', link: '/api/services' },
            { text: 'Projects', link: '/api/projects' },
            { text: 'Servers', link: '/api/servers' },
            { text: 'GitHub Apps', link: '/api/github-apps' },
            { text: 'Private Keys', link: '/api/private-keys' },
            { text: 'Teams', link: '/api/teams' },
            { text: 'System', link: '/api/system' },
            { text: 'Resources', link: '/api/resources' },
          ],
        },
      ],
      '/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'Overview', link: '/examples/' },
            { text: 'Deploying Apps', link: '/examples/deploying-apps' },
            { text: 'Managing Databases', link: '/examples/managing-databases' },
            { text: 'Docker Compose', link: '/examples/docker-compose' },
            { text: 'CI/CD Integration', link: '/examples/ci-cd' },
          ],
        },
      ],
      '/reference/': [
        {
          text: 'Reference',
          items: [
            { text: 'Overview', link: '/reference/' },
            { text: 'Types', link: '/reference/types' },
            { text: 'Errors', link: '/reference/errors' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/neelansh15/coolifyjs' },
    ],

    editLink: {
      pattern: 'https://github.com/neelansh15/coolifyjs/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 CoolifyJS Contributors',
    },
  },
});
