const { app, TouchBar } = require('electron');
const { TouchBarLabel, TouchBarButton, TouchBarSpacer } = TouchBar;
const { utils } = require('./index');

module.exports = function() {
	const label = new TouchBarLabel({ label: app.getName() });
	const spacer = new TouchBarSpacer({ size: 'medium' });
	const playPause = new TouchBarButton({
		label: 'Play / Pause',
		click: () => utils.playPause()
	});
	const forward = new TouchBarButton({
		label: 'Forward',
		click: () => utils.next()
	});
	const backward = new TouchBarButton({
		label: 'Backward',
		click: () => utils.previous()
	});
	return new TouchBar([label, spacer, playPause, forward, backward]);
};
