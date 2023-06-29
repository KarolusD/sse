<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let eventSource: EventSource | null = null;
  let messages: string[] = [];

  function setupEventSource() {
    eventSource = new EventSource('/api');

    eventSource.addEventListener('message', (event: MessageEvent) => {
      const data = event.data;
      // Process the received message
      messages = [...messages, data];
    });

    eventSource.addEventListener('error', () => {
      // Handle errors or connection closed
      console.log('Error occurred or connection closed');
    });
  }

  onMount(() => {
    setupEventSource();
  });

  onDestroy(() => {
    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }
  });
</script>

<main>
  <h1>Ping Messages:</h1>
  {#each messages as message}
    <p>{message}</p>
  {/each}
</main>
