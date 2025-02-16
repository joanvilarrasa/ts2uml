export class LinkManager {
  private static instance: LinkManager;
  private pastebinUrl: string;
  private webUrl: string;
  private link: string;
  private linkIsCopied: boolean;

  private constructor() {
    this.pastebinUrl = import.meta.env.VITE_PASTEBIN_URL;
    this.webUrl = import.meta.env.VITE_WEB_URL;
    this.link = '';
    this.linkIsCopied = false;
    this.createNewLink();
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

  getLinkIsCopied(): boolean {
    return this.linkIsCopied;
  }

  async refreshLink(): Promise<boolean> {
    if (!this.linkIsCopied && this.link !== '') {
      await this.deleteLink();
    }
    this.linkIsCopied = false;
    this.link = await this.createNewLink();
    return true;
  }

  async copyLink(link: string): Promise<boolean> {
    this.linkIsCopied = true;
    await navigator.clipboard.writeText(`${this.webUrl}?id=${link}`);
    return true;
  }

  async createNewLink(): Promise<string | null> {
    const url = `${this.pastebinUrl}/upload`;
    const body = new FormData();
    body.append('expiration', '24hour');
    body.append('syntax_highlight', 'json');
    body.append('privacy', 'public');
    body.append('file', 'binary');
    body.append('content', '{}');

    const response = await fetch(url, {
      method: 'POST',
      body: body,
    });
    if (!response.ok) {
      return null;
    }
    this.link = response.url.split('/').pop();
    return this.link;
  }

  async updateLinkData(content: string): Promise<boolean> {
    const url = `${this.pastebinUrl}/edit/${this.link}`;
    const body = new FormData();
    body.append('content', content);

    const response = await fetch(url, {
      method: 'POST',
      body: body,
    });

    if (response.ok) {
      await navigator.clipboard.writeText(`${this.pastebinUrl}${this.link}`);
    }
    return response.ok;
  }

  async deleteLink() {
    const url = `${this.pastebinUrl}/remove/${this.link}`;
    const response = await fetch(url);
    return response.ok;
  }

  async getLinkData(link: string): Promise<string | null> {
    const url = `${this.pastebinUrl}/raw/${link}`;
    const response = await fetch(url);
    return response.text();
  }
}
