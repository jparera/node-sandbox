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
console.log('[%d] Main process is starting up (%s).', process.pid, __filename);

// Register listeners to handle process events.
process
	.on('SIGINT', onProcessInterrupt)
	.on('exit', onProcessExit);

// Handles process interrupt signal (SIGINT).
function onProcessInterrupt() {
	console.log('[%d] Main process was interrupted by SIGINT signal.', this.pid);
	this.exit(0);
}

// Handles process exit event.
function onProcessExit() {
	console.log('[%d] Main process is exiting.', this.pid);
}

setInterval(task, 2000);

function task() {
	console.log('[%d] Main task.', process.pid);
}
