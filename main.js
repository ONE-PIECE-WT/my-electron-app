// main.js
require('electron-reload')(__dirname);
// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const path = require('node:path')


const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false, // 确保为false，使用preload进行模块加载
        }
    })

    // 加载 index.html
    mainWindow.loadURL('file://' + __dirname + '/index.html')

    // 设置icon
    mainWindow.setIcon(path.join(__dirname, 'logo.png'))

    // 打开开发工具
    mainWindow.webContents.openDevTools()
    
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    createWindow()

    const menuTemplate = [
        {
            label: '文件',
            submenu: [
                { label: '新建', click: () => { /* 新建文件逻辑 */ } },
                { label: '打开', click: () => { /* 打开文件逻辑 */ } },
                { label: '保存', click: () => { /* 保存文件逻辑 */ } },
                { type: 'separator' },
                { label: '退出', role: 'quit' },
            ],
        },
        {
            label: '编辑',
            submenu: [
                { label: '撤销', role: 'undo' },
                { label: '重做', role: 'redo' },
                { type: 'separator' },
                { label: '剪切', role: 'cut' },
                { label: '复制', role: 'copy' },
                { label: '粘贴', role: 'paste' },
            ],
        },
        {
            label: '帮助',
            submenu: [
                { label: '关于', click: () => { /* 关于逻辑 */ } },
            ],
        },
    ];

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);

    app.on('activate', () => {
        // 在 macOS 系统内, 如果没有已开启的应用窗口
        // 点击托盘图标时通常会重新创建一个新窗口
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.commandLine.appendSwitch('lang', 'zh-CN');

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态, 
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。