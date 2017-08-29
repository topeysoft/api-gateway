class ArgManager {

}

ArgManager.getEnviroment = () => {
    var envArg = process.argv.find(function (arg) {
        return arg.match(/(--env|-env)(=)[A-z]+/g);
    }) || '';
    var env = 'development', envArray = envArg.split('=');
    if (envArray.length > 1) {
        env = envArray[1] || "development";
    }
    return env;
}
ArgManager.getPort = () => {
    var portArg = process.argv.find(function (arg) {
        return arg.match(/(--port|-p)(=)\d+/g);
    }) || '';
    var port = portArg.match(/\d+/g) || [3200];
    return normalizePort(port[0]);

}
ArgManager.getSecurePort = () => {
    var portArg = process.argv.find(function (arg) {
        return arg.match(/(--s-port|-s)(=)\d+/g);
    }) || '';
    var port = portArg.match(/\d+/g) || [3200];
    return normalizePort(port[0]);
}

function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

process.env.NODE_ENV = ArgManager.getEnviroment();
process.env.PORT = ArgManager.getPort();
process.env.S_PORT = ArgManager.getSecurePort();
exports.ArgManager = ArgManager;