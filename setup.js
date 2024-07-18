const fs = require('fs');
const path = require('path');

// List of directories to create
const directories = [
  'client/public',
  'client/src/assets/images',
  'client/src/components',
  'client/src/pages',
  'client/src/services',
  'server/config',
  'server/controllers',
  'server/models',
  'server/routes',
  'server/middlewares',
  'server/utils'
];

// List of files to create with initial content
const files = {
  'client/public/index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Adviso</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>`,
  'client/src/App.js': `import React from 'react';

function App() {
  return (
    <div>
      <h1>Welcome to Adviso</h1>
    </div>
  );
}

export default App;`,
  'client/src/index.js': `import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));`,
  'server/app.js': `const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

module.exports = app;`,
  'server/server.js': `const express = require('express');
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});`,
  '.gitignore': `/node_modules
/client/node_modules
/server/node_modules`,
  'README.md': '# Adviso'
};

// Function to create directories
directories.forEach(dir => {
  fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
});

// Function to create files with content
Object.entries(files).forEach(([file, content]) => {
  fs.writeFileSync(path.join(__dirname, file), content.trim());
});

console.log('Project structure created successfully!');
