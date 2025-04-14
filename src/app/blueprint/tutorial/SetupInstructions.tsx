"use client"

import styled from "styled-components";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyButton from "@/components/CopyButton";

// Styled Components for Setup Instructions
const CodeBlockWrapper = styled.div`
  position: relative;
  margin-bottom: 2rem;
  z-index: 0;

  /* Reuse the blueprint grid for the code block background */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-repeat: repeat;
    background-size: 20px 20px;
    opacity: 0.08;
    pointer-events: none;
    background-image: linear-gradient(to right, #e5e7eb 1px, transparent 1px),
      linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
    z-index: 0;
  }
`;

const CodeBlockContainer = styled.div`
  position: relative;
  z-index: 1;
`;

const ClickableLink = styled.a`
  color: #9d845d;
  text-decoration: none;
  transition: text-decoration 0.3s ease, color 0.3s ease;

  &:hover {
    text-decoration: underline;
    color: #7a6644;
  }
`;

interface SetupInstructionsProps {
  framework: string;
  language: string;
}

export default function SetupInstructions({ framework, language }: SetupInstructionsProps) {
  const isTypeScript = language === "typescript";

  const renderInstructions = () => {
    switch (framework) {
      case "nextjs":
        return (
          <>
            <p>
              If you’re using Next.js, you’ll need to set up `styled-components` to work with server-side rendering (SSR). First, install the `babel-plugin-styled-components` package:
            </p>
            <CodeBlockWrapper>
              <CodeBlockContainer>
                <CopyButton code="npm install babel-plugin-styled-components" />
                <SyntaxHighlighter
                  language="bash"
                  style={vscDarkPlus}
                  customStyle={{
                    marginTop: "1rem",
                    borderRadius: "4px",
                    padding: "1rem",
                    backgroundColor: "#1f2937",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  npm install babel-plugin-styled-components
                </SyntaxHighlighter>
              </CodeBlockContainer>
            </CodeBlockWrapper>
            <p>
              Then, create a `.babelrc` file in your project root with the following configuration:
            </p>
            <CodeBlockWrapper>
              <CodeBlockContainer>
                <CopyButton code={`
{
  "presets": ["next/babel"],
  "plugins": [
    [
      "styled-components",
      {
        "ssr": true,
        "displayName": true,
        "preprocess": false
      }
    ]
  ]
}
                `} />
                <SyntaxHighlighter
                  language="json"
                  style={vscDarkPlus}
                  customStyle={{
                    marginTop: "1rem",
                    borderRadius: "4px",
                    padding: "1rem",
                    backgroundColor: "#1f2937",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {`
{
  "presets": ["next/babel"],
  "plugins": [
    [
      "styled-components",
      {
        "ssr": true,
        "displayName": true,
        "preprocess": false
      }
    ]
  ]
}
                  `}
                </SyntaxHighlighter>
              </CodeBlockContainer>
            </CodeBlockWrapper>
            <p>
              Finally, ensure your `next.config.${isTypeScript ? "ts" : "js"}` is set up to handle `styled-components`. You may need to add the following:
            </p>
            <CodeBlockWrapper>
              <CodeBlockContainer>
                <CopyButton code={`
${isTypeScript ? "import type { NextConfig } from 'next';\n\nconst nextConfig: NextConfig = {\n  compiler: {\n    styledComponents: true,\n  },\n};\n\nmodule.exports = nextConfig;" : "const nextConfig = {\n  compiler: {\n    styledComponents: true,\n  },\n};\n\nmodule.exports = nextConfig;"}`} />
                <SyntaxHighlighter
                  language="javascript"
                  style={vscDarkPlus}
                  customStyle={{
                    marginTop: "1rem",
                    borderRadius: "4px",
                    padding: "1rem",
                    backgroundColor: "#1f2937",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {`
${isTypeScript ? "import type { NextConfig } from 'next';\n\nconst nextConfig: NextConfig = {\n  compiler: {\n    styledComponents: true,\n  },\n};\n\nmodule.exports = nextConfig;" : "const nextConfig = {\n  compiler: {\n    styledComponents: true,\n  },\n};\n\nmodule.exports = nextConfig;"}
                  `}
                </SyntaxHighlighter>
              </CodeBlockContainer>
            </CodeBlockWrapper>
          </>
        );

      case "vite":
        return (
          <>
            <p>
              For a Vite project with React, Vite doesn’t require a specific plugin for `styled-components`, but you can add the `vite-plugin-styled-components` for a better development experience (e.g., to enable display names in dev tools):
            </p>
            <CodeBlockWrapper>
              <CodeBlockContainer>
                <CopyButton code="npm install vite-plugin-styled-components" />
                <SyntaxHighlighter
                  language="bash"
                  style={vscDarkPlus}
                  customStyle={{
                    marginTop: "1rem",
                    borderRadius: "4px",
                    padding: "1rem",
                    backgroundColor: "#1f2937",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  npm install vite-plugin-styled-components
                </SyntaxHighlighter>
              </CodeBlockContainer>
            </CodeBlockWrapper>
            <p>
              Update your `vite.config.${isTypeScript ? "ts" : "js"}` to include the plugin:
            </p>
            <CodeBlockWrapper>
              <CodeBlockContainer>
                <CopyButton code={`
${isTypeScript ? "import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\nimport styledComponents from 'vite-plugin-styled-components';\n\nexport default defineConfig({\n  plugins: [react(), styledComponents()],\n});\n" : "import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\nimport styledComponents from 'vite-plugin-styled-components';\n\nexport default defineConfig({\n  plugins: [react(), styledComponents()],\n});\n"}`} />
                <SyntaxHighlighter
                  language="javascript"
                  style={vscDarkPlus}
                  customStyle={{
                    marginTop: "1rem",
                    borderRadius: "4px",
                    padding: "1rem",
                    backgroundColor: "#1f2937",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {`
${isTypeScript ? "import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\nimport styledComponents from 'vite-plugin-styled-components';\n\nexport default defineConfig({\n  plugins: [react(), styledComponents()],\n});\n" : "import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\nimport styledComponents from 'vite-plugin-styled-components';\n\nexport default defineConfig({\n  plugins: [react(), styledComponents()],\n});\n"}
                  `}
                </SyntaxHighlighter>
              </CodeBlockContainer>
            </CodeBlockWrapper>
            <p>
              You can now use the Blueprint components in your Vite project by copying them from `src/templates/components/`.
            </p>
          </>
        );

      case "vue":
        return (
          <>
            <p>
              For a Vue project, install `styled-components` and the Vue plugin for `styled-components`:
            </p>
            <CodeBlockWrapper>
              <CodeBlockContainer>
                <CopyButton code="npm install styled-components vue-styled-components" />
                <SyntaxHighlighter
                  language="bash"
                  style={vscDarkPlus}
                  customStyle={{
                    marginTop: "1rem",
                    borderRadius: "4px",
                    padding: "1rem",
                    backgroundColor: "#1f2937",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  npm install styled-components vue-styled-components
                </SyntaxHighlighter>
              </CodeBlockContainer>
            </CodeBlockWrapper>
            <p>
              Then, register `styled-components` in your Vue project by adding it to your `main.${isTypeScript ? "ts" : "js"}`:
            </p>
            <CodeBlockWrapper>
              <CodeBlockContainer>
                <CopyButton code={`
${isTypeScript ? "import { createApp } from 'vue';\nimport App from './App.vue';\nimport styled from 'vue-styled-components';\n\nconst app = createApp(App);\napp.use(styled);\napp.mount('#app');\n" : "import { createApp } from 'vue';\nimport App from './App.vue';\nimport styled from 'vue-styled-components';\n\nconst app = createApp(App);\napp.use(styled);\napp.mount('#app');\n"}`} />
                <SyntaxHighlighter
                  language="javascript"
                  style={vscDarkPlus}
                  customStyle={{
                    marginTop: "1rem",
                    borderRadius: "4px",
                    padding: "1rem",
                    backgroundColor: "#1f2937",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {`
${isTypeScript ? "import { createApp } from 'vue';\nimport App from './App.vue';\nimport styled from 'vue-styled-components';\n\nconst app = createApp(App);\napp.use(styled);\napp.mount('#app');\n" : "import { createApp } from 'vue';\nimport App from './App.vue';\nimport styled from 'vue-styled-components';\n\nconst app = createApp(App);\napp.use(styled);\napp.mount('#app');\n"}
                  `}
                </SyntaxHighlighter>
              </CodeBlockContainer>
            </CodeBlockWrapper>
            <p>
              You can now use the Blueprint components in your Vue project by copying them from `src/templates/components/`. Note that you may need to adapt the components to use Vue’s syntax (e.g., using `props` and `template` instead of JSX).
            </p>
          </>
        );

      case "cra":
        return (
          <>
            <p>
              For a Create React App project, install `styled-components` as shown in the Installation section. Create React App doesn’t require any additional configuration for `styled-components`:
            </p>
            <CodeBlockWrapper>
              <CodeBlockContainer>
                <CopyButton code="npm install styled-components" />
                <SyntaxHighlighter
                  language="bash"
                  style={vscDarkPlus}
                  customStyle={{
                    marginTop: "1rem",
                    borderRadius: "4px",
                    padding: "1rem",
                    backgroundColor: "#1f2937",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  npm install styled-components
                </SyntaxHighlighter>
              </CodeBlockContainer>
            </CodeBlockWrapper>
            <p>
              You can now use the Blueprint components in your Create React App project by copying them from `src/templates/components/`.
            </p>
          </>
        );

      case "angular":
        return (
          <>
            <p>
              For an Angular project, install `styled-components`:
            </p>
            <CodeBlockWrapper>
              <CodeBlockContainer>
                <CopyButton code="npm install styled-components" />
                <SyntaxHighlighter
                  language="bash"
                  style={vscDarkPlus}
                  customStyle={{
                    marginTop: "1rem",
                    borderRadius: "4px",
                    padding: "1rem",
                    backgroundColor: "#1f2937",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  npm install styled-components
                </SyntaxHighlighter>
              </CodeBlockContainer>
            </CodeBlockWrapper>
            <p>
              Angular doesn’t natively support `styled-components` in the same way as React or Vue, so you’ll need to use a library like `ngx-styled-components` to integrate it:
            </p>
            <CodeBlockWrapper>
              <CodeBlockContainer>
                <CopyButton code="npm install ngx-styled-components" />
                <SyntaxHighlighter
                  language="bash"
                  style={vscDarkPlus}
                  customStyle={{
                    marginTop: "1rem",
                    borderRadius: "4px",
                    padding: "1rem",
                    backgroundColor: "#1f2937",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  npm install ngx-styled-components
                </SyntaxHighlighter>
              </CodeBlockContainer>
            </CodeBlockWrapper>
            <p>
              Then, import `StyledComponentsModule` in your Angular module (e.g., `app.module.${isTypeScript ? "ts" : "js"}`):
            </p>
            <CodeBlockWrapper>
              <CodeBlockContainer>
                <CopyButton code={`
${isTypeScript ? "import { BrowserModule } from '@angular/platform-browser';\nimport { NgModule } from '@angular/core';\nimport { StyledComponentsModule } from 'ngx-styled-components';\nimport { AppComponent } from './app.component';\n\n@NgModule({\n  declarations: [AppComponent],\n  imports: [BrowserModule, StyledComponentsModule],\n  providers: [],\n  bootstrap: [AppComponent],\n})\nexport class AppModule {}\n" : "import { BrowserModule } from '@angular/platform-browser';\nimport { NgModule } from '@angular/core';\nimport { StyledComponentsModule } from 'ngx-styled-components';\nimport { AppComponent } from './app.component';\n\n@NgModule({\n  declarations: [AppComponent],\n  imports: [BrowserModule, StyledComponentsModule],\n  providers: [],\n  bootstrap: [AppComponent],\n})\nexport class AppModule {}\n"}`} />
                <SyntaxHighlighter
                  language={isTypeScript ? "typescript" : "javascript"}
                  style={vscDarkPlus}
                  customStyle={{
                    marginTop: "1rem",
                    borderRadius: "4px",
                    padding: "1rem",
                    backgroundColor: "#1f2937",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {`
${isTypeScript ? "import { BrowserModule } from '@angular/platform-browser';\nimport { NgModule } from '@angular/core';\nimport { StyledComponentsModule } from 'ngx-styled-components';\nimport { AppComponent } from './app.component';\n\n@NgModule({\n  declarations: [AppComponent],\n  imports: [BrowserModule, StyledComponentsModule],\n  providers: [],\n  bootstrap: [AppComponent],\n})\nexport class AppModule {}\n" : "import { BrowserModule } from '@angular/platform-browser';\nimport { NgModule } from '@angular/core';\nimport { StyledComponentsModule } from 'ngx-styled-components';\nimport { AppComponent } from './app.component';\n\n@NgModule({\n  declarations: [AppComponent],\n  imports: [BrowserModule, StyledComponentsModule],\n  providers: [],\n  bootstrap: [AppComponent],\n})\nexport class AppModule {}\n"}
                  `}
                </SyntaxHighlighter>
              </CodeBlockContainer>
            </CodeBlockWrapper>
            <p>
              You can now use the Blueprint components in your Angular project by copying them from `src/templates/components/`. You’ll need to adapt the components to Angular’s syntax (e.g., using Angular templates and directives instead of JSX).
            </p>
          </>
        );

      case "svelte":
        return (
          <>
            <p>
              For a Svelte project, install `styled-components`. Svelte requires a preprocessor to handle `styled-components`, so you’ll also need to install `svelte-preprocess`:
            </p>
            <CodeBlockWrapper>
              <CodeBlockContainer>
                <CopyButton code="npm install styled-components svelte-preprocess" />
                <SyntaxHighlighter
                  language="bash"
                  style={vscDarkPlus}
                  customStyle={{
                    marginTop: "1rem",
                    borderRadius: "4px",
                    padding: "1rem",
                    backgroundColor: "#1f2937",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  npm install styled-components svelte-preprocess
                </SyntaxHighlighter>
              </CodeBlockContainer>
            </CodeBlockWrapper>
            <p>
              Update your `svelte.config.${isTypeScript ? "ts" : "js"}` to include `svelte-preprocess`:
            </p>
            <CodeBlockWrapper>
              <CodeBlockContainer>
                <CopyButton code={`
${isTypeScript ? "import preprocess from 'svelte-preprocess';\n\nexport default {\n  preprocess: preprocess(),\n};\n" : "import preprocess from 'svelte-preprocess';\n\nexport default {\n  preprocess: preprocess(),\n};\n"}`} />
                <SyntaxHighlighter
                  language="javascript"
                  style={vscDarkPlus}
                  customStyle={{
                    marginTop: "1rem",
                    borderRadius: "4px",
                    padding: "1rem",
                    backgroundColor: "#1f2937",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {`
${isTypeScript ? "import preprocess from 'svelte-preprocess';\n\nexport default {\n  preprocess: preprocess(),\n};\n" : "import preprocess from 'svelte-preprocess';\n\nexport default {\n  preprocess: preprocess(),\n};\n"}
                  `}
                </SyntaxHighlighter>
              </CodeBlockContainer>
            </CodeBlockWrapper>
            <p>
              You can now use the Blueprint components in your Svelte project by copying them from `src/templates/components/`. You’ll need to adapt the components to Svelte’s syntax (e.g., using Svelte’s template syntax instead of JSX).
            </p>
          </>
        );

      default:
        return (
          <p>
            Setup instructions for {framework} are not yet available. Please check the <ClickableLink href="/docs">Docs</ClickableLink> for more information or contact support.
          </p>
        );
    }
  };

  return renderInstructions();
}