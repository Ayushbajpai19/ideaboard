const express = require('express');
const cors = require('cors');
const middleware = require('./middleware');

const postRoute = require("./routes/post-routes");
const commentRoute = require("./routes/comment-routes");
const questionRoute = require("./routes/question-routes");
const solutionRoute = require("./routes/solution-routes");

const app = express();
const port = 5001;

app.use(cors());

app.use(middleware.decodeToken);

// This is only for a test purpose
app.get('/api/todos', (req, res) => {
	return res.json({
		todos: [
			{
				title: 'Task1',
			},
			{
				title: 'Task2',
			},
			{
				title: 'Task3',
			},
		],
	});
});

app.use("/api/", postRoute);
app.use("/api/", commentRoute);
app.use("/api/", questionRoute);
app.use("/api/", solutionRoute);

app.listen(port, () => {
	console.log(`server is running on port ${port}`);
});

