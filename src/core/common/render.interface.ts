export interface IRenderFile {
  renderHtml(file: string, data: string[]): string;
}
