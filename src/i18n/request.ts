import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';
 
export default getRequestConfig(async ({requestLocale}) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
 
  const base = (await import(`../../messages/${locale}.json`)).default as Record<string, unknown>;
  const blog = (await import(`../../messages/blog/${locale}.json`)).default as Record<string, unknown>;

  return {
    locale,
    messages: {
      ...base,
      Blog: blog
    }
  };
});