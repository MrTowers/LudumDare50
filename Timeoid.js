const { app, BrowserWindow } = require("electron");

function createWindow () {
    const win = new BrowserWindow({
        fullscreen: true,
        icon: "icon.ico",
        title: "Timeoid",
        frame: false
    });

    win.loadFile("index.html");

    win.addListener("reload", () => {
        win.reload();
    });
}

app.whenReady().then(() => {
    createWindow();
});