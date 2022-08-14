const express = require("express");
const authUser = require("../middlewares/authUser");
const authOp = require("../middlewares/authOp");
const router = express.Router();

const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

router.use(authUser);

/**
 * @swagger
 * components:
 *  schemas:
 *    Task:
 *      type: object
 *      required:
 *        - title
 *        - description
 *        - completed
 *        - dueDate
 *      properties:
 *        title:
 *          type: string
 *        description:
 *          type: string
 *        completed:
 *          type: boolean
 *        dueDate:
 *          type: string
 *        comments:
 *          type: string
 *        responsible:
 *          type: string
 *        tags:
 *          type: array
 *          items:
 *            type: string
 *        ownerID:
 *          type: string
 *      example:
 *        title: Finish Finsof challenge
 *        description: Project made as part of the BAP Corporativo interview process
 *        completed: true
 *        dueDate: Sun Aug 14 2022 23:59:59 GMT-0500 (Central Daylight Time)
 *        tags: [test1, test2]
 *    User:
 *      type: object
 *      required:
 *        - firstName
 *        - lastName
 *      properties:
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *      example:
 *        firstName: Francisco
 *        lastName: Gonzalez
 */

/**
 * @swagger
 * tags:
 *  - name: Tasks
 *    description: The Tasks managing API
 *  - name: Users
 *    description: Not implemented
 */

/**
 * @swagger
 * /api/v1/tasks:
 *  get:
 *    summary: Returns all tasks of the specified user
 *    tags: [Tasks]
 *    parameters:
 *      - in: header
 *        name: uid
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the requesting user.
 *    responses:
 *      200:
 *        description: The list of the tasks
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Task'
 *      400:
 *        description: Bad Request. Request has no 'uid' header or header is empty.
 *      401:
 *        description: Unauthorized. No user with provided ID was found.
 *      500:
 *        description: Internal Server Error. Invalid user ID.
 *
 */

router.get("/", getAllTasks);

/**
 * @swagger
 * /api/v1/tasks/:
 *  post:
 *    summary: Create a task for the provided user ID
 *    tags: [Tasks]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Task'
 *    parameters:
 *      - in: header
 *        name: uid
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the requesting user.
 *    responses:
 *      201:
 *        description: The Task was successfully created.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 *      400:
 *        description: Bad Request. Request has no 'uid' header or header is empty.
 *      401:
 *        description: Unauthorized. No user with provided ID was found.
 *      500:
 *        description: Internal Server Error. Invalid user ID.
 */

router.post("/", createTask);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *  get:
 *    summary: Get a task by ID
 *    tags: [Tasks]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The task ID
 *      - in: header
 *        name: uid
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the requesting user.
 *    responses:
 *      200:
 *        description: The Task description by ID
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 *      400:
 *        description: Bad Request. Request has no 'uid' header or header is empty.
 *      401:
 *        description: Unauthorized. No user with provided ID was found.
 *      403:
 *        description: Forbidden. Task does not belong to requesting user.
 *      404:
 *        description: Not found. Task with provided ID does not exist.
 *      500:
 *        description: Internal Server Error. Invalid user ID/task ID.
 */

router.get("/:id", authOp, getTask);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *  patch:
 *    summary: Update a task by ID
 *    tags: [Tasks]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Task'
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The task ID
 *      - in: header
 *        name: uid
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the requesting user.
 *    responses:
 *      200:
 *        description: Task was successfully updated.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 *      400:
 *        description: Bad Request. Request has no 'uid' header or header is empty.
 *      401:
 *        description: Unauthorized. No user with provided ID was found.
 *      403:
 *        description: Forbidden. Task does not belong to requesting user.
 *      404:
 *        description: Not found. Task with provided ID does not exist.
 *      500:
 *        description: Internal Server Error. Invalid user ID/Task ID.
 */

router.patch("/:id", authOp, updateTask); // PATCH method is used instead of PUT method to update only the fields that changed

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *  delete:
 *    summary: Delete a task by ID
 *    tags: [Tasks]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The task ID
 *      - in: header
 *        name: uid
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the requesting user.
 *    responses:
 *      200:
 *        description: Task was successfully deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 *      400:
 *        description: Bad Request. Request has no 'uid' header or header is empty.
 *      401:
 *        description: Unauthorized. No user with provided ID was found.
 *      403:
 *        description: Forbidden. Task does not belong to requesting user.
 *      404:
 *        description: Not found. Task with provided ID does not exist.
 *      500:
 *        description: Internal Server Error. Invalid user ID/Task ID.
 */

router.delete("/:id", authOp, deleteTask);
module.exports = router;
