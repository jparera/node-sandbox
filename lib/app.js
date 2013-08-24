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
var fork = require("child_process").fork;

startUp("Main");

function startUp(name) {
	console.log(
		"[%d] %s process is starting up (%s).",
		process.pid,
		name,
		__filename
	);
	// Register listeners to handle process events.
	process
		.on("SIGINT", onProcessInterrupt)
		.on("exit", onProcessExit);
	// Fork a child process.
	var child = fork(__dirname + "/child.js");
	// Register listeners to handle child process events.
	child
		.on("message", onChildMessage)
		.on("disconnect", onChildDisconnect);
	// Handles IPC channel messages.
	function onChildMessage(msg) {
		console.log(
			"[%d] %s received a message from [%d]:",
			process.pid,
			name,
			this.pid,
			msg
		);
		this.send("Hello my child process!");
	}
	// Handles IPC channel disconnect event.
	function onChildDisconnect() {
		console.log(
			"[%d] %s process received IPC channel disconnect event from [%d].",
			process.pid,
			name,
			this.pid
		);
	}
	// Handles process interrupt signal (SIGINT).
	function onProcessInterrupt() {
		console.log(
			"[%d] %s process was interrupted by SIGINT signal.",
			this.pid,
			name
		);
	}
	// Handles process exit event.
	function onProcessExit() {
		console.log("[%d] %s process is exiting.", this.pid, name);
	}
}
