import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier";

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
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn', // 使用 any 類型時僅警告

      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 只在生產環境警告 console.log
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off' // 只在生產環境警告 debugger
    }
  },
  eslintConfigPrettier,
]);

export default eslintConfig;
