import { Helmet } from "react-helmet-async";

const SITE_NAME = "Nexus Design & Built";
const DEFAULT_DESC =
  "Nexus Design & Built delivers end-to-end interior design, architecture, consulting and IT solutions.";

export default function SEO({ title, description = DEFAULT_DESC, path = "" }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Interior, Architecture, Consulting & IT`;
  const baseUrl = import.meta.env.VITE_SITE_URL || "https://www.nexusdesignbuilt.com";
  const url = `${baseUrl.replace(/\/$/, "")}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
