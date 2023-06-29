import type { RequestHandler } from '@sveltejs/kit';

export const GET = (async () => {
	let interval: number;
		let controller: ReadableStreamDefaultController<string>;
		const stream = new ReadableStream({
		start(ctr) {
			if (controller) {
        return; // Guard to prevent multiple start calls
      }
			controller = ctr;
			interval = setInterval(() => controller.enqueue('data: ping\n\n'), 3000);

			// const myData = ['abc', 'def'];
			// myData.forEach((data) => {
			// 	controller.enqueue(`data: ${data}\n\n`);
			// });
		},
		cancel() {
			controller.close();
      clearInterval(interval)
		}
	});

	return new Response(stream, {
		headers: {
			// Denotes the response as SSE
			'Content-Type': 'text/event-stream',
			// Optional. Request the GET request not to be cached.
			'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'

		}
	});
}) satisfies RequestHandler;