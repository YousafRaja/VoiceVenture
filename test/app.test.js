const request = require('supertest');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.statusCode = 200;
  const msg = 'Hello from from Primus Learning, this was awesome';
  res.send(getPage(msg));
});

app.get('/test', (req, res) => {
  res.statusCode = 200;
  const msg = 'Hello from /test Node!';
  res.send(getPage(msg));
});

function getPage(message) {
  const OS = require('os');
  const ENV = 'DEV';
  let body = "<!DOCTYPE html>\n"
    + "<html>\n"
    + "<style>\n"
    + "body, html {\n"
    + "  height: 100%;\n"
    + "  margin: 0;\n"
    + "}\n"
    + ".bgimg {\n"
    + "  background-image: url('https://www.w3schools.com/w3images/forestbridge.jpg');\n"
    + "  height: 100%;\n"
    + "  background-position: center;\n"
    + "  background-size: cover;\n"
    + "  position: relative;\n"
    + "  color: white;\n"
    + "  font-family: \"Courier New\", Courier, monospace;\n"
    + "  font-size: 25px;\n"
    + "}\n"
    + ".topleft {\n"
    + "  position: absolute;\n"
    + "  top: 0;\n"
    + "  left: 16px;\n"
    + "}\n"
    + ".bottomleft {\n"
    + "  position: absolute;\n"
    + "  bottom: 0;\n"
    + "  left: 16px;\n"
    + "}\n"
    + ".middle {\n"
    + "  position: absolute;\n"
    + "  top: 50%;\n"
    + "  left: 50%;\n"
    + "  transform: translate(-50%, -50%);\n"
    + "  text-align: center;\n"
    + "}\n"
    + "hr {\n"
    + "  margin: auto;\n"
    + "  width: 40%;\n"
    + "}\n"
    + "</style>\n"
    + "<body>\n"
    + "<div class=\"bgimg\">\n"
    + "  <div class=\"topleft\">\n"
    + "    <p>ENVIRONMENT: " + ENV + "</p>\n"
    + "  </div>\n"
    + "  <div class=\"middle\">\n"
    + "    <h1>Host/container name</h1>\n"
    + "    <hr>\n"
    + "    <p>" + OS.hostname() + "</p>\n"
    + "  </div>\n"
    + "  <div class=\"bottomleft\">\n"
    + "    <p>" + message + "</p>\n"
    + "  </div>\n"
    + "</div>\n"
    + "</body>\n"
    + "</html>\n";
  return body;
}

describe('GET /', () => {
  it('responds with HTML', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Hello from from Primus Learning, this was awesome');
  });
});

describe('GET /test', () => {
  it('responds with HTML', async () => {
    const response = await request(app).get('/test');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Hello from /test Node!');
  });
});
