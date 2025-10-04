export function getSelectedLanguage(url: string): 'tr' | 'en' | null {
    const match = url.match(/\/(tr|en)$/);
    return match ? match[1] as 'tr' | 'en' : null;
  }
  