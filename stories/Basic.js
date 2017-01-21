import React from 'react';
import random from 'random-words';
import CodeHighlight from './components/codeHighlight.js';
import { Limitless } from '../src/index';

// Generate example datum with a message and timestamp
const makeItem = () => ({
  timestamp: new Date(),
  message: random({min: 27, max:90}).join(" ")
});

// Create N items for testing
const items = [...Array(1000)].map((_, i) => makeItem());

// Function to render the datum
const renderItem = (index, key) => (
  <div key={key} style={{ padding: 10 }}>
    {items[index].timestamp.toISOString()}: {items[index].message}
  </div>
);

export default () => (
  <div>
    
    <Limitless
      data={items}
      overscan={20}
      renderRow={renderItem}
      rowHeightEstimate={70}
    />

    <CodeHighlight language='javascript'>
      {() => getCode()}
    </CodeHighlight>
  </div>
)

function getCode () {
  return `<Limitless />`
}
