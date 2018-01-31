const { app, BrowserWindow, globalShortcut } = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

const utils = {
	click(selector) {
		win.webContents.executeJavaScript(`document.querySelector('${selector}').click();`);
	},

	playPause() {
		this.click('.animated-play-button');
	},

	next() {
		this.click('.skip-forward-button');
	},

	previous() {
		this.click('.skip-back-button');
	},

	settings() {
		this.click('.nav-settings > .nav-link');
	},

	setup() {
		win.webContents.executeJavaScript(`
			let css = document.createElement('style');
			css.type = 'text/css';
			css.innerHTML = \`
				.app .electron-drag { display: block !important }
				.navigation { padding-top: 25px !important }
				.navigation .logo.icon-logo { top: 45px !important }
			\`;
			document.body.appendChild(css);
		`);
	}
};
exports.utils = utils;

function createWindow() {
	// Create the browser window.
	win = new BrowserWindow({
		width: 1200,
		height: 750,
		title: 'Pocket Casts',
		titleBarStyle: 'hidden',
		backgroundColor: '#060606'
	});

	win.loadURL('https://playbeta.pocketcasts.com/web/');

	// win.openDevTools();

	require('./menu')();

	const touchBar = require('./touchbar')();
	win.setTouchBar(touchBar);

	utils.setup();

	globalShortcut.register('MediaPlayPause', () => utils.playPause());
	globalShortcut.register('MediaPreviousTrack', () => utils.previous());
	globalShortcut.register('MediaNextTrack', () => utils.next());

	// Emitted when the window is closed.
	win.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null;
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('will-quit', () => {
	// Unregister all shortcuts.
	globalShortcut.unregisterAll();
});

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (win === null) {
		createWindow();
	}
});
