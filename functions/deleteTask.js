// This function is the endpoint's request handler.
exports = async function(arg, payload, response) {
  const contentTypes = {"Content-Type": ["application/json"]};
  const mbContext = context.services.get("mongodb-atlas");
  const taskTable = mbContext.db("task-manager").collection("tasks");
  const isTaskValid = await taskTable.findOne( { _id: {$eq: new BSON.ObjectId(arg.query.id)} } );
  if(isTaskValid) {
    await taskTable.deleteOne({ _id: {$eq: new BSON.ObjectId(arg.query.id)} });
    return {
      code: 200,
      message: 'Task deleted successfully.'
    }
  } else {
    return {
      code: 500,
      message: 'Not found'
    }
  }
};
