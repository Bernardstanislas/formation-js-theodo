import './lb-services';

const addItem = (items, newItem) => [...items, {id: (new Date()).getTime(), ...newItem}];
const removeItem = (items, itemId) => items.filter(({id}) => id !== itemId);
const modifyItem = (items, modifiedItem) => [...(items.filter(({id}) => id !== modifiedItem.id)), modifiedItem];

angular.module('todo-list', ['lbServices'])
.controller('TodoListController', function($scope, $http, Todo) {
  $scope.title = 'Ma Todo liste';
  $scope.todos = [];

  const updateTodos = () => {
    Todo.find().$promise
    .then(todos => {
      $scope.todos = todos;
    });
  }

  updateTodos();

  $scope.addItem = () => {
    Todo.create({
      task: $scope.query,
      checked: false,
      priority: 1
    }).$promise
    .then(newTodo => {
      $scope.todos = [...$scope.todos, newTodo];
    });
    $scope.query = '';
  };

  $scope.removeItem = id => {
    Todo.deleteById({id}).$promise
    .then(updateTodos);
  };

  $scope.modifyItem = item => {
    const modifiedTask = prompt('Modify todo task', item.task);
    item.task = modifiedTask;
    item.$save()
  };

});

module.exports = {addItem, removeItem, modifyItem};
