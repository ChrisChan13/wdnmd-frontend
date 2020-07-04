import React from 'react';
import getConfig from 'next/config';
import Link from 'next/link';
import { UrlObject } from 'url';

const { env: ENV } = getConfig().publicRuntimeConfig;

type Props = {
  href: string | UrlObject,
  label: string,
  alias?: string,
  className?: string,
};

export default (props: Props) => {
  const {
    href, alias, label, className = '',
  } = props;
  if (ENV === 'dev') {
    return (
      <Link href={href}>
        <span className={className}>{label}</span>
      </Link>
    );
  }
  const prefix = '/wdnmd';
  const to = `${prefix}${alias || href.toString()}`;
  return (
    <a href={to} className={className}>{label}</a>
  );
};
