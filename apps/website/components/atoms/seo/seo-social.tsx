/**
 * Everything related to Social media SEO tags
 */
export function SEOSocial() {
  return (
    <>
      <meta
        name="description"
        content="Are you hungry to find your online community? We provide you all the information you need to make your decision all in one spot. Let us be your Gateway."
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mygateway.xyz/" />
      <meta property="og:title" content="Gateway - Find your Community" />
      <meta
        property="og:description"
        content="Are you hungry to find your online community? We provide you all the information you need to make your decision all in one spot. Let us be your Gateway."
      />
      <meta property="og:image" content="/social.png" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://mygateway.xyz/" />
      <meta property="twitter:title" content="Gateway - Find your Community" />
      <meta
        property="twitter:description"
        content="Are you hungry to find your online community? We provide you all the information you need to make your decision all in one spot. Let us be your Gateway."
      />
      <meta property="twitter:image" content="/social.png" />
    </>
  );
}
