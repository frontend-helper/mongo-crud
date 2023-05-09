// This function is the endpoint's request handler.
exports = async function(payload, response) {
  const contentTypes = {"Content-Type": ["application/json"]};
  const reqBody = JSON.parse(payload.body.text());
  const mbContext = context.services.get("mongodb-atlas");
  const taskTable = mbContext.db("task-manager").collection("tasks");
  const isTaskFound = await taskTable.findOne( { "name": {$eq: reqBody.name} } );
  if(isTaskFound) {
    return {
     message: 'Task already added.' 
    }
  } else {
    await taskTable.insertOne(reqBody);
    return {
      code: 200,
      message: 'Task added successfully.'
    }
  }
}