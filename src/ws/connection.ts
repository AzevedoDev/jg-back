export function service(request: Request): Response | Promise<Response> {
  if (request.headers.get('upgrade') !== 'websocket') {
    return new Response('not trying to upgrade as websocket');
  }
  const { socket, response } = Deno.upgradeWebSocket(request);
  socket.onopen = () => console.log('socket open');
  socket.onmessage = (e) => {
    console.log('socket message', e.data);
    socket.send(new Date().toString());
  };
  socket.onerror = (e) => console.log('socket errored', e);
  socket.onclose = () => console.log('socket closed');
  return response;
}
