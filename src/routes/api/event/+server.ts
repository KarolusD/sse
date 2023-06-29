import { event } from 'sveltekit-server-sent-events'

const delay = (milliseconds: number) =>  new Promise(r => setTimeout(r, milliseconds))

export function GET() {
	return event(async emit => {
    let counter = 0
		while (counter > 10) {
			emit(`${counter} ${new Date()}`)
			await delay(1000)
      counter++
		}
	}).toResponse()
}