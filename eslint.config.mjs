import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier";
import perfectionist from 'eslint-plugin-perfectionist';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    plugins: {
      perfectionist,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn', // 使用 any 類型時僅警告
      'perfectionist/sort-jsx-props': [
        "warn",
        {
          "groups": [
            "component", "variant", "id", "ref", "key", 
            "class", "name", "label", "lang", "src", 
            "type", "href", "value", "title", "alt", 
            "placeholder", "DEFAULT", "disabled", "loading"
          ],
          "customGroups": [
            { groupName: 'component', elementNamePattern: '^component$' },
            { groupName: 'variant', elementNamePattern: '^variant$' },
            { groupName: 'id', elementNamePattern: '^id$' },
            { groupName: 'ref', elementNamePattern: '^ref$' },
            { groupName: 'key', elementNamePattern: '^key$' },
            { groupName: 'class', elementNamePattern: '^(?::)?class$' },
            { groupName: 'name', elementNamePattern: '^(?::)?name$' },
            { groupName: 'label', elementNamePattern: '^label' },
            { groupName: 'lang', elementNamePattern: '^(?::)?lang$' },
            { groupName: 'src', elementNamePattern: '^(?::)?src$' },
            { groupName: 'type', elementNamePattern: '^(?::)?type$' },
            { groupName: 'href', elementNamePattern: '^(?::)?href$' },
            { groupName: 'value', elementNamePattern: '^(?::)?value$' },
            { groupName: 'title', elementNamePattern: '^(?::)?title$' },
            { groupName: 'alt', elementNamePattern: '^(?::)?alt$' },
            { groupName: 'placeholder', elementNamePattern: '^(?::)?placeholder$' },
            { groupName: 'DEFAULT', elementNamePattern: '$DEFAULT' },
            { groupName: 'disabled', elementNamePattern: '^(?::)?disabled$' },
            { groupName: 'loading', elementNamePattern: '^(?::)?loading$' },
          ],
        },
        {
          "type": "alphabetical"
        }
      ],

      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 只在生產環境警告 console.log
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off' // 只在生產環境警告 debugger
    }
  },
  eslintConfigPrettier,
]);

export default eslintConfig;
