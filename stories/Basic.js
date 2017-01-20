import React from 'react'
//
import CodeHighlight from './components/codeHighlight.js'
import Limitless from '../src/index'

export default () => (
  <div>
    <Limitless>
      <div>This will be limitless!</div>
    </Limitless>

    <CodeHighlight language='javascript'>
      {() => getCode()}
    </CodeHighlight>
  </div>
)

function getCode () {
  return `
<Limitless>
  <div>This will be limitless!</div>
</Limitless>
  `
}
