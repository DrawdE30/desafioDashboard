export function formatCreateTask(task) {
    return {
        assigneeId: task.assigneeId || task.assignee.id,
        dueDate: task.dueDate,
        name: task.name,
        pointEstimate: task.pointEstimate,
        status: task.status,
        tags: task.tags,
    };
}

export function formatUpdateTask(task) {
    return {
        assigneeId: task.assigneeId || task.assignee.id,
        dueDate: task.dueDate,
        id: task.id,
        name: task.name,
        pointEstimate: task.pointEstimate,
        // position: null,
        status: task.status,
        tags: task.tags,
    };
}
