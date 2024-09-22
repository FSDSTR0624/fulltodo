const getTasks = (req, res) => {
    res.status(200).json([
        {
            id: "1",
            title: "Sample Task",
            description: "This is a sample task",
            status: "TODO",
            dueDate: "2023-12-31",
            user: "user1",
            createdAt: new Date(),
            modifiedAt: new Date()
        }
    ]);
};

const getTaskById = (req, res) => {
    const {id} = req.params;
    if (id === "1") {
        res.status(200).json({
            id: "1",
            title: "Sample Task",
            description: "This is a sample task",
            status: "TODO",
            dueDate: "2023-12-31",
            user: "user1",
            createdAt: new Date(),
            modifiedAt: new Date()
        });
    } else if (id === "2") {
        res.status(403).json({ msg: "Forbidden" });
    } else {
        res.status(404).json({ msg: "Task not found" });
    }
};

const createTask = (req, res) => {
    const {title} = req.body;
    if (!title) {
        res.status(400).json({ msg: "You missed parameter 'title'" });
    } else {
        res.status(201).json({ msg: "Task created", id: "123456" });
    }
};

const updateTask = (req, res) => {
    const { id } = req.params;
    const {title} = req.body;
    if (!title) {
        res.status(400).json({ msg: "You missed parameters: 'id' or 'title'" });
    } else if (id === "2") {
        res.status(403).json({ msg: "Forbidden" });
    } else if (id === "3") {
        res.status(404).json({ msg: "Task not found" });
    } else {
        res.status(200).json({ msg: "Task updated" });
    }
};

const deleteTask = (req, res) => {
    const { id } = req.params;
    if (id === "2") {
        res.status(403).json({ msg: "Forbidden" });
    } else if (id === "3") {
        res.status(404).json({ msg: "Task not found" });
    } else {
        res.status(200).json({ msg: "Task removed successfully" });
    }
};

const markTaskAsDone = (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ msg: "Missing parameter: id" });
    } else if (id === "2") {
        res.status(403).json({ msg: "Forbidden" });
    } else if (id === "3") {
        res.status(404).json({ msg: "Task not found" });
    } else {
        res.status(200).json({ msg: "Task marked as completed" });
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
