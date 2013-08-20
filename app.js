console.log('[%d] Main process', process.pid, __filename);

process.on('newListener', function(event) {
	console.log('[%d] newListener Handler A: New listener has been registered for %s event.', this.pid, event);
});

process.on('newListener', function(event) {
	console.log('[%d] newListener Handler B: New listener has been registered for %s event.', this.pid, event);
});

process.on('exit', function() {
	console.log('[%d] Main process will shutdown.', this.pid);
});

setTimeout(task, 5000);

function task() {
	console.log('[%d] Task.', process.pid);
}
