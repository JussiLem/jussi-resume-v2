// eslint-disable-next-line import/no-extraneous-dependencies
import 'tailwindcss/tailwind.css';
import '../src/globalStyles.scss';

import type { AppProps } from 'next/app';
import { memo } from 'react';

const MyApp = memo(
  ({ Component, pageProps }: AppProps): JSX.Element => (
    <>
      <Component {...pageProps} />
    </>
  ),
);

export default MyApp;
