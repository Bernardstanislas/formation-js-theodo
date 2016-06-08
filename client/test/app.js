import {expect} from 'chai';

// Js dom
import jsdom from 'jsdom';
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = {
    userAgent: 'node.js'
};
const angular = require('../bower_components/angular/angular');

// take all properties of the window object and also attach it to the
// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal (window) {
    for (const key in window) {
        if (!window.hasOwnProperty(key)) {continue; }
        if (key in global) {continue; }
        global[key] = window[key];
    }
}
// mocha global object
propagateToGlobal(window);

process.on('unhandledRejection', (error)=>{
    console.error('Unhandled Promise Rejection:');
    console.error(error && error.stack || error);
});

const app = require('../src/app');
const {addItem, removeItem, modifyItem} = app;

const items = [
  {
    id: 1,
    priority: 2,
    task: 'titi',
    checked: false
  },
  {
    id: 2,
    priority: 3,
    task: 'toto',
    checked: true
  }
];

describe('The item addition function', () => {
  const newItem = {
    id: 3,
    priority: 1,
    task: 'tata',
    checked: true
  };
  const result = addItem(items, newItem);
  it('should add an item when an item is provided', () => {
    expect(result.length).to.equal(3);
  });
  it('should add the provided item when an item is provided', () => {
    expect(result).to.deep.equal([...items, newItem]);
  })
});

describe('The item removal function', () => {
  const itemIdToRemove = 2;
  const result = removeItem(items, itemIdToRemove);
  it('should remove the provided item', () => {
    expect(result.length).to.equal(1);
    expect(result).to.deep.equal(items.slice(0, 1));
  });
});

describe('The item modification function', () => {
  const modifiedItem = {
    id: 1,
    priority: 2,
    task: 'titi lol',
    checked: true
  };
  const result = modifyItem(items, modifiedItem);
  it('should modify the provided item', () => {
    expect(result.length).to.equal(2);
    expect(result).to.deep.equal([items[1], modifiedItem]);
  });
});
