declare class readable {
  constructor(capitalize?: boolean, wordCount?: number, separator?: string);
  generate(): string;
}

declare namespace readable {
}

export = readable;
