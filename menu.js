const { app, Menu } = require('electron');
const { utils } = require('./index');

module.exports = function() {
	const template = [
		{
			label: 'Edit',
			submenu: [
				{ role: 'undo' },
				{ role: 'redo' },
				{ type: 'separator' },
				{ role: 'cut' },
				{ role: 'copy' },
				{ role: 'paste' },
				{ role: 'pasteandmatchstyle' },
				{ role: 'delete' },
				{ role: 'selectall' }
			]
		},
		{
			label: 'View',
			submenu: [
				// reload needs to re-inject the css
				// it probably doesn't work with forcereload
				{
					label: 'Reload',
					accelerator: 'CmdOrCtrl+R',
					click: (item, focusedWindow) => {
						if (focusedWindow) {
							focusedWindow.reload();
							utils.setup();
						}
					}
				},
				// { role: 'forcereload' },
				{ role: 'toggledevtools' },
				{ type: 'separator' },
				{ role: 'resetzoom' },
				{ role: 'zoomin' },
				{ role: 'zoomout' },
				{ type: 'separator' },
				{ role: 'togglefullscreen' }
			]
		},
		{
			label: 'Playback',
			submenu: [
				{
					label: 'Play / Pause',
					click: () => utils.playPause(),
				},
				{
					label: 'Forward',
					click: () => utils.previous(),
				},
				{
					label: 'Backward',
					click: () => utils.next(),
				}
			]
		},
		{
			role: 'window',
			submenu: [
				{ role: 'minimize' },
				{ role: 'close' }
			]
		},
	];

	if (process.platform === 'darwin') {
		template.unshift({
			label: app.getName(),
			submenu: [
				{ role: 'about' },
				{
					label: 'Preferences',
					accelerator: 'Command+,',
					click: () => utils.settings()
				},
				{ type: 'separator', },
				{ role: 'services', submenu: [] },
				{ type: 'separator', },
				{ role: 'hide' },
				{ role: 'hideothers' },
				{ role: 'unhide' },
				{ type: 'separator' },
				{ role: 'quit' }
			]
		});

		template[1].submenu.push(
			{ type: 'separator' },
			{
				label: 'Speech',
				submenu: [
					{ role: 'startspeaking' },
					{ role: 'stopspeaking' }
				]
			}
		);

		template[4].submenu = [
			{ role: 'minimize' },
			{ role: 'zoom' },
			{ type: 'separator' },
			{ role: 'front' }
		];
	}

	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
};
