const http = require('http');
const fs = require('fs');
const qs = require('qs');
const port = 5000;
const userList = [];

const server = http.createServer(function (req, res) {
    if (req.method === 'GET') {
        fs.readFile('./views/register.html', function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    } else {
        let data = '';
        // chunk is buffer receive from request body
        // chunk will auto convert to readable data
        req.on('data', chunk => {
            // handle event when request has data
            data += chunk;
        })
        // handle event when end request
        req.on('end', () => {
            const userInfo = qs.parse(data);
            fs.readFile('./views/info.html', 'utf8', function (err, dataHtml) {
                if (err) {
                    console.log(err);
                }
                let list = "";
                userList.push(userInfo)
                userList.forEach((user,index)=> {
                    list += `
                    <tr>
                    <td>${1 + index}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    </tr>
                    `
                })

                dataHtml = dataHtml.replace('{list}',list);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(dataHtml);
                return res.end();
            });
        })
        // handle event when req error
        req.on('error', () => {
            console.log('error')
        })
    }
});

server.listen(port, function () {
    console.log('server running at port http://localhost:' + port)
});