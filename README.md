<!-- <div align="center">
  <a href="https://github.com/zsherman/react-limitless" target="\_parent">
    <img src="https://github.com/zsherman/react-limitless/raw/master/media/banner.png" alt="React Table Logo" style="width:550px;"/>
  </a>
  <br />
  <br />
</div>
-->

<a href="https://travis-ci.org/zsherman/react-limitless" target="\_parent">
  <img alt="" src="https://travis-ci.org/zsherman/react-limitless.svg?branch=master" />
</a>
<a href="https://npmjs.com/package/react-limitless" target="\_parent">
  <img alt="" src="https://img.shields.io/npm/dm/react-limitless.svg" />
</a>
<a href="https://react-chat-signup.herokuapp.com/" target="\_parent">
  <img alt="" src="https://img.shields.io/badge/slack-react--chat-blue.svg" />
</a>
<a href="https://github.com/zsherman/react-limitless" target="\_parent">
  <img alt="" src="https://img.shields.io/github/stars/zsherman/react-limitless.svg?style=social&label=Star" />
</a>
<a href="https://twitter.com/zsherman" target="\_parent">
  <img alt="" src="https://img.shields.io/twitter/follow/zsherman.svg?style=social&label=Follow" />
</a>

React Limitless is a micro-lib for virtualized scrolling in react

## Features

- **4kb!** (minified)
- Other Features...

## [Demo](https://zsherman.github.com/react-limitless/?selectedKind=2.%20Demos&selectedStory=Kitchen%20Sink&full=0&down=0&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel)

## Table of Contents
- [Installation](#installation)
- [Example](#example)

## Installation
```bash
$ npm install react-limitless
```

## Example
What does react-limitless look like? This is the shortest and most concise example we could think of. Looking for more detail? Dive deep with the [Annotated Demo Example](#annotated-demo-example)

```javascript
  <Limitless data={data} />
)
```



## Contributing
To suggest a feature, create an issue if it does not already exist.
If you would like to help develop a suggested feature follow these steps:

- Fork this repo
- `$ yarn`
- `$ yarn run storybook`
- Implement your changes to files in the `src/` directory
- View changes as you code via our <a href="https://github.com/storybooks/react-storybook" target="\_parent">React Storybook</a> `localhost:8000`
- Make changes to stories in `/stories`, or create a new one if needed
- Submit PR for review

#### Scripts

- `$ yarn run storybook` Runs the storybook server
- `$ yarn run test` Runs the test suite
- `$ yarn run prepublish` Builds the distributable bundle
- `$ yarn run docs` Builds the website/docs from the storybook for github pages
