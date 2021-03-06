//  Author: Falgun Patel
//  Banner Id:  B00845029
//  End Sprint API in Sprint Management and Task modification feature controller

const connectionObject = require('../../../MySQLCon')

var endSprint = (req, res) => {
    if (!req.body.hasOwnProperty("projectID") || !req.body.hasOwnProperty("sprintID")) {
        return res
            .status(400)
            .json({ msg: `Please include all mandatory details such as  sprintID and projectID` });
    }

    let whereSprintID = 'WHERE sprintID = ? and projectID = ? and isComplete = ?'
    let whereNewActive = 'WHERE Sprints.order = ? and projectID = ? and isComplete = ?'
    let whereTaskActiveSprint = 'WHERE status = ? and status = ? and sprintid = ? and projectid = ?'
    let endActiveSprint = 'UPDATE Sprints SET isComplete = ? ' + whereSprintID
    let newActiveSprint = 'UPDATE Sprints SET isComplete = ? ' + whereNewActive
    let activeSprintOrder = 'SELECT Sprints.order as Sprintorder from Sprints ' + whereSprintID
    let updateTasksSprint = 'UPDATE Tasks SET sprintid = ? ' + whereTaskActiveSprint
    let sprint_details = [1, req.body.sprintID, req.body.projectID, 0]
    let order_sprint_details = [req.body.sprintID, req.body.projectID, 0]
    
    let active_sprint_tasks = [null, null, 0, req.body.sprintID, req.body.projectID]
    var order

    connectionObject.query(activeSprintOrder, order_sprint_details, (err, result) => {
        if (err) {
            throw err;
        }

        if (result == undefined) {
            res.status(400).json({ msg: `No active sprint found with sprintID: ${req.body.sprintID} and projectID: ${req.body.projectID}` });
        }
        else {
            order = result[0].sprintOrder + 1;

            //sprint end karveni
            connectionObject.query(endActiveSprint, sprint_details, (err, result) => {
                if (err) {
                    throw err;
                }
                if (result[0] == 1) {
                    //aa sprint na je task baki hoi ae backlog ma nakhe
                    connectionObject.query(updateTasksSprint, active_sprint_tasks, (err, result) => {
                        if (err) {
                            throw err;
                        }
                        //navi sprint chalu karvani
                        let new_active_sprint = [0, order, req.body.projectID, null]
                        connectionObject.query(newActiveSprint, new_active_sprint, (err, result) => {
                            if (err) {
                                throw err;
                            }
                            if (result[0] == 1) {
                                res.status(200).json({ msg: `successfully ended sprint: ${req.body.sprintID} from project: ${req.body.projectID}` });
                            }
                        })

                    })

                }
            })
        }
    })

}

module.exports.endSprint = endSprint