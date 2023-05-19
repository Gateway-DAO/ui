export function PlaygroundTab() {
  return (
    <iframe
      id="playground"
      src={`${process.env.NEXT_PUBLIC_GATEWAY_PROTOCOL_ENDPOINT}?headers={"x-api-key":"${process.env.NEXT_PUBLIC_PLAYGROUND_API_KEY}"}`}
      name="playground"
      width="100%"
      height="800"
      frameBorder="0"
      scrolling="no"
    ></iframe>
  );
}
