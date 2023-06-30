import type { RequestHandler } from '@sveltejs/kit';

export const GET = (async () => {
	let interval: number;
	let controller: ReadableStreamDefaultController<string>;
	const stream = new ReadableStream({
		start(ctr) {
			controller = ctr;
			interval = setInterval(() => {
				controller.enqueue(`data: ping ${new Date()}\n\n`);
			}, 3000);
		},
		cancel() {
			clearInterval(interval);
		}
	});

	return new Response(stream, {
		headers: {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			Connection: 'keep-alive',
			'Access-Control-Allow-Origin': '*' // Allow requests from all origins (update as needed)
		}
	});
}) satisfies RequestHandler;
