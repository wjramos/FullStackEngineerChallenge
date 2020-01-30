import React from 'react';
import { Global, css } from '@emotion/core'

const RESET = `
	html {
		box-sizing: border-box;
	}

	html,
	body,
	#root {
		min-height: 100vh;
		width: 100%;
		position: relative;
	}

	*,
	*:before,
	*:after {
		box-sizing: inherit;
	}

	body {
		margin: 0;
		font-size: 16px;
		overflow-x: hidden;
	}

	ol,
	ul {
		list-style: none;
    padding-left: 0;
	}
	
	li {
	  list-style: none;
	}

	img {
		max-width: 100%;
		height: auto;
	}
	
	a {
	  text-decoration: none;
	}
	
	a,
	button {
	  cursor: pointer;
	}
`;

const FONT_SMOOTHING = `
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	-webkit-text-stroke: 0.45px rgba(0, 0, 0, 0.1);
`;

const GLOBAL_STYLES = css`
  ${RESET}

  body {
    ${FONT_SMOOTHING}

    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  }

  code,
  pre {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }
`;

export default function GlobalStyles() {
  return (
    <Global styles={GLOBAL_STYLES} />
  );
}