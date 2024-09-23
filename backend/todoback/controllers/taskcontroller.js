const Task = require('./models/taskschema');

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ status: { $ne: 'DONE' } });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

const createTask = async (req, res) => {
    const { title, description, dueDate, user } = req.body;
    if (!title) {
        return res.status(400).json({ msg: "You missed parameter 'title'" });
    }
    try {
        const newTask = new Task({
            title,
            description,
            dueDate,
            user
        });
        const task = await newTask.save();
        res.status(201).json({ msg: "Task created", id: task.id });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

const updateTask = async (req, res) => {
    const { title, description, dueDate } = req.body;
    if (!title) {
        return res.status(400).json({ msg: "You missed parameters: 'id' or 'title'" });
    }
    try {
        let task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.modifiedAt = Date.now();
        await task.save();
        res.status(200).json({ msg: "Task updated" });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        await task.remove();
        res.status(200).json({ msg: "Task removed successfully" });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

const markTaskAsDone = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        task.status = 'DONE';
        task.modifiedAt = Date.now();
        await task.save();
        res.status(200).json({ msg: "Task marked as completed" });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    markTaskAsDone
};
