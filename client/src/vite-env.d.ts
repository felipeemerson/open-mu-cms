/// <reference types="./svg" />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.json' {
  const value: any;
  export default value;
}
