import { service } from './src/ws/connection.ts';

async function handleConn(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);
  for await (const event of httpConn) {
    event.respondWith(service(event.request));
  }
}

const listener = Deno.listen({ port: 8000 });
console.log('listening on http://localhost:8000');
for await (const conn of listener) {
  handleConn(conn);
}
