// FIXME: https://github.com/import-js/eslint-plugin-import/issues/3169
declare module 'eslint-plugin-import' {
  import type { Linter } from 'eslint';

  export const flatConfigs: {
    [key: string]: Linter.Config | undefined;
    recommended: Linter.Config;
    typescript: Linter.Config;
  };
}

// Asset declarations
declare module '*.png' {
  const value: number;
  export default value;
}

declare module '*.jpg' {
  const value: number;
  export default value;
}

declare module '*.jpeg' {
  const value: number;
  export default value;
}

declare module '@/assets/*' {
  const value: number;
  export default value;
}
