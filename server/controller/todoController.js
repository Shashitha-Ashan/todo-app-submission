const mongoose = require('mongoose');
const Todo = require('../models/Todo');
const { sendResponse } = require('../utils/responseFormatter');

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const getTodos = async (req, res, next) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });
        return sendResponse(res, 200, true, 'Todos fetched successfully', todos);
    } catch (error) {
        return next(error);
    }
};

const createTodo = async (req, res, next) => {
    try {
        const { title, description } = req.body || {};

        if (!title || !title.trim()) {
            return sendResponse(res, 400, false, 'Title is required', null);
        }

        const todo = await Todo.create({
            title: title.trim(),
            description: description ? description.trim() : ''
        });

        return sendResponse(res, 201, true, 'Todo created successfully', todo);
    } catch (error) {
        return next(error);
    }
};

const updateTodo = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return sendResponse(res, 400, false, 'Invalid todo id', null);
        }

        const { title, description } = req.body || {};

        const updates = {};
        if (title !== undefined) {
            updates.title = title.trim();
        }
        if (description !== undefined) {
            updates.description = description.trim();
        }
        updates.updatedAt = Date.now();

        const todo = await Todo.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true
        });

        if (!todo) {
            return sendResponse(res, 404, false, 'Todo not found', null);
        }

        return sendResponse(res, 200, true, 'Todo updated successfully', todo);
    } catch (error) {
        return next(error);
    }
};

const toggleTodoDone = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return sendResponse(res, 400, false, 'Invalid todo id', null);
        }

        const todo = await Todo.findById(id);
        if (!todo) {
            return sendResponse(res, 404, false, 'Todo not found', null);
        }

        todo.done = !todo.done;
        todo.updatedAt = Date.now();
        await todo.save();

        return sendResponse(res, 200, true, 'Todo status toggled', todo);
    } catch (error) {
        return next(error);
    }
};

const deleteTodo = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return sendResponse(res, 400, false, 'Invalid todo id', null);
        }

        const todo = await Todo.findByIdAndDelete(id);

        if (!todo) {
            return sendResponse(res, 404, false, 'Todo not found', null);
        }

        return sendResponse(res, 200, true, 'Todo deleted successfully', todo);
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    toggleTodoDone,
    deleteTodo
};
