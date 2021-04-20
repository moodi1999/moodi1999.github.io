window.connection = null;
window.createConnection = url => {
  console.log("createConnection", url);
  window.connection = new signalR.HubConnectionBuilder().withUrl(url).build();
};
window.startConnection = onConnected => {
  console.log("startConnection", onConnected);
  window.connection.start().then(() => {
    console.log("connected!");
    onConnected();
  });
};
window.stopConnection = onConnected => {
  console.log("stopConnection", onConnected);
  window.connection.stop().then(() => onConnected());
};

window.setOnCloseHandler = callback => {
  console.log("setOnCloseHandler", callback);
  window.connection.onclose(error => callback(error));
};

window.invokeMethod = (methodName, args, onResult) => {
  console.log("invoked ", methodName);
  let _args = JSON.parse(args);
  window.connection.invoke(methodName, ..._args).then(v => {
    console.log("invoked ", methodName, "result:", v);
    onResult(v == null ? "null" : JSON.stringify(v));
  });
};

window.off = methodName => {
  console.log("off ", methodName);
  window.connection.off(methodName);
};

window.on = (methodName, callback) => {
  console.log("on ", methodName, callback);
  window.connection.on(methodName, (r) => {
    let result = r == null ? "null" : JSON.stringify(r);
    callback(result);
  });
};