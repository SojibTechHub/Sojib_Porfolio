import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, image }) => {
  const siteName = 'Sojib | Fullstack Developer';
  const fullTitle = title ? `${title} | Sojib` : siteName;
  const desc = description || 'Fullstack Developer portfolio showcasing projects, skills, and experience.';
  const img = image || '/og-image.png';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={img} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
    </Helmet>
  );
};
