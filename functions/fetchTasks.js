// This function is the endpoint's request handler.
exports = function({ query, headers, body}, response) {
    const contentTypes = {"Content-Type": ["application/json"]};
    const mbContext = context.services.get("mongodb-atlas");
    const table = mbContext.db("task-manager").collection("tasks");
    const result = table.find();
    return result;
};