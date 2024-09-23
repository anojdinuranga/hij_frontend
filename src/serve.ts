import nodemon from 'nodemon';
import  browserSync from 'browser-sync';

// Start the nodemon process
const server = nodemon({
  script: 'src/index.ts' // Replace 'app.js' with the entry point of your Node.js server
});

// Reload the browser when server-side code changes
server.on('restart', () => {
  setTimeout(() => {
    browserSync.reload({
      stream: false
    });
  }, 1000); // Delay the reload to ensure the server restarts properly
});

// Start the browser-sync server
browserSync({
  proxy: 'localhost:8081', // Replace '3000' with your server's port
  files: ['src/**/*.*'], // Replace 'public' with your static files directory
  ignore: ['node_modules'],
  reloadDelay: 500 // Delay the reload to allow time for the server to restart
});
