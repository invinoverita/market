'use client';
import { default as NextLink, LinkProps } from 'next/link';
import { FC, PropsWithChildren } from 'react';

import { useSearchParams } from 'next/navigation';

const Link: FC<PropsWithChildren<LinkProps> & { className?: string }> = ({
  children,
  ...props
}) => {
  const params = useSearchParams();
  const utm_source = params?.get('utm_source');
  const name = params?.get('name');
  const phone = params?.get('phone');

  const query = {
    ...(utm_source ? { name } : {}),
    ...(name ? { name } : {}),
    ...(phone ? { phone } : {}),
  };

  const href = {
    pathname: props.href,
    query,
  } as LinkProps['href'];

  return (
    <NextLink {...props} href={href}>
      {children}
    </NextLink>
  );
};

export default Link;
