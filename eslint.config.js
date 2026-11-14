import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import { withVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import globals from 'globals'

export default withVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}']
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
  },
  js.configs.recommended,
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  {
    name: 'app/browser-globals',
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },
  {
    name: 'app/node-globals',
    files: ['**/*.config.{js,ts,mjs,cjs}', 'vite.config.ts'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },
  skipFormatting
)
