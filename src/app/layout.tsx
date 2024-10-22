import { GeistSans } from 'geist/font/sans';
import { ensureStartsWith } from '../lib/utils';
import { ReactNode, Suspense } from 'react';
import { Header, Footer } from '../layout';

import { Newsletter } from 'src/components/Newsletter/Newsletter';

import './globals.css';
import { getCategories } from 'src/lib/api';

import StoreProvider from 'src/Providers/StoreProvider';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR
  ? ensureStartsWith(TWITTER_CREATOR, '@')
  : undefined;
const twitterSite = TWITTER_SITE
  ? ensureStartsWith(TWITTER_SITE, 'https://')
  : undefined;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Интернет-магазин',
  robots: {
    follow: true,
    index: true,
  },
  openGraph: {
    type: 'website',
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite,
      },
    }),
};

export const revalidate = 10;

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const categories = await getCategories();

  return (
    <StoreProvider>
      <html lang="en" className={GeistSans.variable}>
        <body className="border-slate-200 text-slate-900">
          <Header categories={categories.result} />
          {/* <Suspense>
            <main>
              {children}
              <Newsletter />
            </main>
          </Suspense> */}
          {/* <Footer categories={categories.result} /> */}
        </body>
      </html>
    </StoreProvider>
  );
}
