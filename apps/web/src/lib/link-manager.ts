export class LinkManager {
  private static instance: LinkManager;
  private pastebinUrl: string;
  private webUrl: string;
  private link: string;

  private constructor() {
    this.pastebinUrl = import.meta.env.VITE_PASTEBIN_URL;
    this.webUrl = import.meta.env.VITE_WEB_URL;
    this.link = '';
  }

  static getInstance(): LinkManager {
    if (!LinkManager.instance) {
      LinkManager.instance = new LinkManager();
    }
    return LinkManager.instance;
  }

  getLink(): string {
    return this.link;
  }

  async copyLinkToClipboard(link: string): Promise<boolean> {
    await navigator.clipboard.writeText(`${this.webUrl}?id=${link}`);
    return true;
  }

  async createNewLink(content: string): Promise<string | null> {
    const url = `${this.pastebinUrl}/upload`;
    const body = new FormData();
    body.append('expiration', '24hour');
    body.append('syntax_highlight', 'json');
    body.append('privacy', 'public');
    body.append('file', 'binary');
    body.append('content', content);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: body,
      });
      if (!response.ok) {
        return null;
      }
      this.link = response.url.split('/').pop();
      return this.link;
    } catch (_) {
      return null;
    }
  }

  async deleteLink() {
    if (this.link === '') {
      return true;
    }
    const url = `${this.pastebinUrl}/remove/${this.link}`;
    try {
      const response = await fetch(url);
      return response.ok;
    } catch (_) {
      return false;
    }
  }

  async getLinkData(link: string): Promise<string | null> {
    const url = `${this.pastebinUrl}/raw/${link}`;
    const response = await fetch(url);
    return response.text();
  }
}
