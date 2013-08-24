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

startUp("Child");

setInterval(task, 2000);

function task() {
	if (process.connected) {
		process.send("Hello my parent process!");
	}
}

function startUp(name) {
	console.log(
		"[%d] %s process is starting up (%s).",
		process.pid,
		name,
		__filename
	);
	// Register listeners to handle child process events.
	process
		.on("message", onProcessMessage)
		.on("disconnect", onProcessDisconnect)
		.on("SIGINT", onProcessInterrupt)
		.on("exit", onProcessExit);
	// Handles IPC channel messages.
	function onProcessMessage(msg) {
		console.log(
			"[%d] %s process has received a message:",
			this.pid,
			name,
			msg
		);
	}
	// Handles process interrupt signal (SIGINT).
	function onProcessInterrupt() {
		console.log(
			"[%d] %s process was interrupted by SIGINT signal.",
			this.pid,
			name
		);
		if (process.connected) {
			process.disconnect();
		} else {
			this.exit(0);
		}
	}
	// Handles IPC channel disconnect event.
	function onProcessDisconnect() {
		console.log(
			"[%d] %s process received IPC channel disconnect event.",
			this.pid,
			name
		);
	}
	// Handles process exit event.
	function onProcessExit() {
		console.log("[%d] %s process is exiting.", this.pid, name);
	}
}
