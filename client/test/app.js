import {expect} from 'chai';
import {addItem, removeItem, modifyItem} from '../src/app';

// Angular mock to avoid big test frameworks
const angular = {
  controller: () => {}
}
angular.module = () => angular;
global.angular = angular;

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
