const express = require("express");
const gdRouter = require("./routes/gd");
const editRouter = require("./routes/edit");
const tinyurlRouter = require('./routes/tinyurl');
const tiktokRouter = require('./routes/tiktok');
const hercaiRouter = require('./routes/ai');
const facebookRoute = require('./routes/fbdl');
const bardRouter = require('./routes/bard');
const ytRouter = require('./routes/yt');
const instaRouter = require('./routes/instalk');
const tikstalkRouter = require('./routes/tikstalk');
const patRouter = require('./routes/pat');
const chalk = require('chalk');

const app = express();
const port1 = 8080;
const port2 = 5000;
const port3 = 3000;
const port4 = 6208;
const port5 = 3920;
const port6 = 3739;
const port7 = 3333;
const port8 = 8393;
const port9 = 8292
const port10 = 8297
const port11 = 2000;

app.use(express.static("public"));

// Function to deploy routes with a countdown
const deployRoutes = (port, delay) => {
  console.log(chalk.bold(`Deploying routes on port ${port}...`));
  let count = 5;
  const countdownInterval = setInterval(() => {
    if (count === 0) {
      clearInterval(countdownInterval);
      console.log(chalk.bold.green(`All routes deployed on port ${port}`));
    } else {
      console.log(chalk.bold(`Countdown: ${count}`));
      count--;
    }
  }, 1000 * delay);
};

// Middleware to log request time and status
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusColor = res.statusCode >= 200 && res.statusCode < 300 ? 'green' : 'red';
    console.log(chalk.bold(`Request on ${chalk.cyanBright(req.path)} took ${duration} ms - Status: ${chalk[statusColor](res.statusCode)}`));
  });
  next();
});

app.use("/gd", gdRouter);
app.use("/edit", editRouter);
app.use('/tiktok', tiktokRouter);
app.use('/api', tinyurlRouter);
app.use('/api', hercaiRouter);
// Include tinyurl routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', facebookRoute); 
app.use('/api', bardRouter); 
app.use('/api', tikstalkRouter);
app.use('/api', ytRouter);
app.use('/api',instaRouter);


// Deploy routes on different ports with a delay
deployRoutes(port1, 5);
deployRoutes(port2, 5);
deployRoutes(port3, 5);
deployRoutes(port4, 5);
deployRoutes(port5, 5);

app.listen(port1, () => {
  console.log(chalk.bold(`Server listening at ${chalk.blueBright(`http://localhost:${port1}`)}`));
});

app.listen(port2, () => {
  console.log(chalk.bold(`Server listening at ${chalk.blueBright(`http://localhost:${port2}`)}`));
});

app.listen(port3, () => {
  console.log(chalk.bold(`Server listening at ${chalk.blueBright(`http://localhost:${port3}`)}`));
});

app.listen(port4, () => {
  console.log(chalk.bold(`Server listening at ${chalk.blueBright(`http://localhost:${port4}`)}`));
});

app.listen(port5, () => {
  console.log(chalk.bold(`Server listening at ${chalk.blueBright(`http://localhost:${port5}`)}`));
});

app.listen(port6, () => {
  console.log(chalk.bold(`Server listening at ${chalk.blueBright(`http://localhost:${port6}`)}`));
});

app.listen(port7, () => {
  console.log(chalk.bold(`Server listening at ${chalk.blueBright(`http://localhost:${port7}`)}`));
});

app.listen(port8, () => {
  console.log(chalk.bold(`Server listening at ${chalk.blueBright(`http://localhost:${port8}`)}`));
});

app.listen(port9, () => {
  console.log(chalk.bold(`Server listening at ${chalk.blueBright(`http://localhost:${port9}`)}`));
});

app.listen(port10, () => {
  console.log(chalk.bold(`Server listening at ${chalk.blueBright(`http://localhost:${port10}`)}`));
});
