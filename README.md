<div  align="center">

<h1>Track updates for your dependencies</h1>

</div>

## Intro

Chrome/Firefox extension build with <b>React + Vite + TypeScript + MaterialUI</b>

## Features

- [React 19](https://reactjs.org/)

- [TypeScript](https://www.typescriptlang.org/)

- [Material UI](https://mui.com/material-ui/)

- [ESLint](https://eslint.org/)

- [Chrome Extension Manifest Version 3](https://developer.chrome.com/docs/extensions/mv3/intro/)

## Usage

### Developing and building

Running `dev` or `build` commands without specifying the browser target will build

for Chrome by default.

1. Run `nvm use` (check .nvmrc for node version)

2. Run `yarn install`

3. Run `yarn dev[:chrome|:firefox]`

Running a `dev` command will build the extension and watch for changes in the

source files. Changing the source files will refresh the corresponding

`dist_<chrome|firefox>` folder.

To create an optimized production build, run `yarn build[:chrome|:firefox]`

Project uses Prettier from vscode pluggins as default formatter. Run `yarn format` to format your code.

### Load your extension to browser

For Chrome

1. Open - Chrome browser

2. Access - [chrome://extensions](chrome://extensions)

3. Tick - Developer mode

4. Find - Load unpacked extension

5. Select - `dist_chrome` folder in this project (after dev or build)

For Firefox

1. Open - Firefox browser

2. Access - [about:debugging#/runtime/this-firefox](about:debugging#/runtime/this-firefox)

3. Click - Load temporary Add-on

4. Select - any file in `dist_firefox` folder (i.e. `manifest.json`) in this project (after dev or build)

## References

Thanks to [@JohnBra](https://github.com/JohnBra) for providing template https://github.com/JohnBra/vite-web-extension

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
