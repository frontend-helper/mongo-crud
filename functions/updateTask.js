// This function is the endpoint's request handler.
exports = async function(payload, response) {
  const contentTypes = {"Content-Type": ["application/json"]};
  const reqBody = JSON.parse(payload.body.text());
  const mbContext = context.services.get("mongodb-atlas");
  const taskTable = mbContext.db("task-manager").collection("tasks");
  const isTaskValid = await taskTable.findOne( { _id: {$eq: new BSON.ObjectId(reqBody._id)} } );
  if(isTaskValid) {
    const updatedObj = {
     ...isTaskValid,
     name: reqBody.name
    }
    await taskTable.updateOne({ _id: {$eq: new BSON.ObjectId(reqBody._id)} }, updatedObj);
    return {
      code: 200,
      message: 'Task updated successfully.'
    }
  } else {
    return {
      code: 500,
      message: 'Not found'
    }
  }
};
