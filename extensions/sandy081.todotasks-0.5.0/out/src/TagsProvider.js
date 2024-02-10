'use strict';
var vscode_1 = require('vscode');
var TodoDocument_1 = require('./TodoDocument');
var TagsProvider = (function () {
    function TagsProvider() {
    }
    TagsProvider.getTags = function (prefix) {
        prefix = prefix && prefix !== TodoDocument_1.TodoDocument.SYMBOL_TAG
            ? prefix.startsWith(TodoDocument_1.TodoDocument.SYMBOL_TAG) ? prefix.substring(1) : prefix.toLocaleLowerCase()
            : "";
        var filtered = TagsProvider.TAGS.filter(function (tag, index, collection) {
            return !prefix || tag.toLocaleLowerCase().indexOf(prefix) !== -1;
        });
        var result = filtered.map(this.toCompletionItem);
        return Promise.resolve(result);
    };
    TagsProvider.toCompletionItem = function (tag, index, collection) {
        tag = TodoDocument_1.TodoDocument.toTag(tag);
        var completionItem = new vscode_1.CompletionItem(tag);
        completionItem.insertText = tag + " ";
        return completionItem;
    };
    TagsProvider.TAGS = [TodoDocument_1.TodoDocument.TAG_CRITICAL,
        TodoDocument_1.TodoDocument.TAG_HIGH,
        TodoDocument_1.TodoDocument.TAG_LOW,
        TodoDocument_1.TodoDocument.TAG_TODAY];
    return TagsProvider;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TagsProvider;
//# sourceMappingURL=TagsProvider.js.map