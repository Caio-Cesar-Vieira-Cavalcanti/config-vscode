'use strict';
var TagsProvider_1 = require('./TagsProvider');
var TodoCompletionItemProvider = (function () {
    function TodoCompletionItemProvider() {
    }
    TodoCompletionItemProvider.prototype.provideCompletionItems = function (document, position, token) {
        var range = document.getWordRangeAtPosition(position);
        var prefix = range ? document.getText(range) : '';
        return TagsProvider_1.default.getTags(prefix);
    };
    return TodoCompletionItemProvider;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TodoCompletionItemProvider;
//# sourceMappingURL=TodoCompletionItemProvider.js.map