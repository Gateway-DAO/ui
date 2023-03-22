/**
 * Everything related to Social media SEO tags
 */
export function SEOSocial() {
  return (
    <>
      <meta
        name="description"
        content="Gateway is a decentralized protocol for creating, consuming, and displaying verifiable credentials to serve as a basis for an interconnected web and portable reputation."
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.mygateway.xyz/" />
      <meta property="og:title" content="Gateway - The Credential Protocol" />
      <meta
        property="og:description"
        content="Gateway is a decentralized protocol for creating, consuming, and displaying verifiable credentials to serve as a basis for an interconnected web and portable reputation."
      />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.mygateway.xyz/" />
      <meta
        property="twitter:title"
        content="Gateway - The Credential Protocol"
      />
      <meta
        property="twitter:description"
        content="Gateway is a decentralized protocol for creating, consuming, and displaying verifiable credentials to serve as a basis for an interconnected web and portable reputation."
      />
      <meta property="twitter:image" content="/social.png" />
    </>
  );
}
