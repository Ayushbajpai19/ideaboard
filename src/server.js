const { default: mongoose } = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const middleware = require('./middleware');
const postRoute = require("./routes/post-routes");
const commentRoute = require("./routes/comment-routes");
const questionRoute = require("./routes/question-routes");
const solutionRoute = require("./routes/solution-routes");

const port = 5001;

const dbUrl = 'mongodb://localhost/idb'

app.use(cors());

// app.use(middleware.decodeToken);

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

app.use("/api", postRoute);
app.use("/api", commentRoute);
app.use("/api", questionRoute);
app.use("/api", solutionRoute);

mongoose.connect(dbUrl, {useNewUrlParser: true}).then((con) => {
	console.log("connected: ");
	app.listen(port, () => {
		console.log(`server is running on port ${port}`);
	});
})


