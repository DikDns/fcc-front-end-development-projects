export default function ({ className }) {
  return (
    <footer className={className}>
      by{" "}
      <a className="underline" href="https://dikdns.com" target={`_blank`}>
        DikDns
      </a>
      .
    </footer>
  );
}
