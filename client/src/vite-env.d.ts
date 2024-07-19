/// <reference types="vite/client" />

declare module '*.svg' {
  import * as React from 'react';

  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string; className?: string }
  >;
  export default ReactComponent;
}

declare module '*.json' {
  const value: any;
  export default value;
}
