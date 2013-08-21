/*
* Copyright (C) 2013 Juan Parera Garcia
* This file is part of node-sandbox.
*
* This program is free software; you can redistribute it and/or
* modify it under the terms of the GNU General Public License
* as published by the Free Software Foundation; either version 3
* of the License, or (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see http://www.gnu.org/licenses/
*/
console.log('[%d] Main process', process.pid, __filename);

process
	.on('newListener', onNewListenerA)
	.on('newListener', onNewListenerB)
	.on('SIGINT', onProcessInterrupt)
	.on('exit', onProcessExit);

function onNewListenerA(event) {
	onNewListener.call(this, event, 'Handler A');
}

function onNewListenerB(event) {
	onNewListener.call(this, event, 'Handler B');
}

function onNewListener(event, name) {
	console.log(
		'[%d] newListener %s: New listener has been registered for %s event.',
		this.pid,
		name,
		event);
}

function onProcessInterrupt() {
	console.log('[%d] Main process was interrupted.', this.pid);
	this.exit(0);
}

function onProcessExit() {
	console.log('[%d] Main process will shutdown.', this.pid);
}

setTimeout(task, 5000);
setInterval(task, 10000);

function task() {
	console.log('[%d] Task.', process.pid);
}
