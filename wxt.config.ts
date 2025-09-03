import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: [
    '@wxt-dev/module-vue',
    '@wxt-dev/i18n/module',
  ],
  srcDir: './src',
  publicDir: './src/public',
  manifest: {
    "name": "__MSG_ext_name__",
    "description": "__MSG_ext_desc__",
    "homepage_url": "https://poptab.magicx.dev",
    'default_locale': 'en',
    action: {},
    permissions: [
      'contextMenus',
      'activeTab',
    ],
    key: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhN+Txmlz0uULp213GnISLwL6sf7P6/3/2gWprN5Q2gmPLyP9GnsvpNkDziuwt91m2sI8ZRWhZHtBhm1yHWQMw3eKDDWKYmilrmyKwOUFG6TtQk3by+AMsH+/VRYu0C8o2E9QD3+bMSElUQRQ6mHR4R5fx9lrZl/16NvdAjPvHuX0jGA3nBs8FDUBWu45Lt5oe3qOqjg2/zDOpjDAkDf0fl917cpLRogLOn4SxIy5VVjUQu3JVoi1+GHqA7fzKrRMZ5htP9v0x9bitKRhBOXwEiLc1pFZERAscnY2Cdr+l3L//PkggPMlxp2fgl8k2GFl4NeKyohzsLJw0B5R8cIWAQIDAQAB',
  },
});
