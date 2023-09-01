const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const blogsDir = path.join(__dirname, 'blogs');

app.use(express.static('public'));

const parseChlog = chlogText => {
    let parsed = {};
    let currentKey = '';

    chlogText.split(/\n|\r/g).forEach(line => {
        if (line.startsWith('TITLE=')) {
            parsed.title = line.split('=')[1];
        } else if (line.startsWith('TAGLINE=')) {
            parsed.tagline = line.split('=')[1];
        } else if (line.startsWith('[')) {
            currentKey = line.replace(/\[|\]/g, '').toLowerCase();
            parsed[currentKey] = [];
        } else if (line) {
            parsed[currentKey].push(line);
        }

        console.log(parsed);
    });

    return parsed;
};

const generateHTML = parsed => {
    let html = `<h1>Rust Changelog - ${parsed.title}</h1>\n<p>${parsed.tagline}</p>\n`;

    ['features', 'improvements', 'fixes'].forEach(section => {
        if (parsed[section]) {
            html += `<h2 class="${section}">${section.toUpperCase()}</h2>\n<ul>\n`;
            parsed[section].forEach(item => {
                html += `  <li>${item}</li>\n`;
            });
            html += '</ul>\n';
        }
    });

    return html;
};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/changelogs', (req, res) => {
    fs.readdir(blogsDir, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading blogs directory');
        }

        return res.json(
            files
                .filter(file => file.endsWith('.chlog'))
                .map(file => file.replace('.chlog', ''))
        );
    });
});

app.get('/changelog/:name', (req, res) => {
    const filePath = path.join(blogsDir, `${req.params.name}.chlog`);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).send('Changelog not found');
        }

        const parsed = parseChlog(data);
        const html = generateHTML(parsed);

        res.send(html);
    });
});

app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});
