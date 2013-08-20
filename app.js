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

process.on('newListener', function(event) {
	console.log(
		'[%d] newListener Handler A: New listener has been registered for %s event.',
		this.pid,
		event);
});

process.on('newListener', function(event) {
	console.log(
		'[%d] newListener Handler B: New listener has been registered for %s event.',
		this.pid,
		event);
});

process.on('exit', function() {
	console.log('[%d] Main process will shutdown.', this.pid);
});

setTimeout(task, 5000);

function task() {
	console.log('[%d] Task.', process.pid);
}
