import React, { ReactNode } from 'react';
import getConfig from 'next/config';
import Link from 'next/link';
import { UrlObject } from 'url';

const { env: ENV } = getConfig().publicRuntimeConfig;

type Props = {
  href: string | UrlObject,
  label?: string,
  alias?: string,
  className?: string,
  children?: ReactNode,
};

export default (props: Props) => {
  const {
    href, alias, label, className = '', children,
  } = props;
  if (ENV === 'dev') {
    return (
      <Link href={href}>
        {
          children || <span className={className}>{label}</span>
        }
      </Link>
    );
  }
  const prefix = '/wdnmd';
  const to = `${prefix}${alias || href.toString()}`;
  return (
    <a
      href={to}
      style={{ textDecoration: 'none' }}
      className={className}
    >
      {
        children || label
      }
    </a>
  );
};
