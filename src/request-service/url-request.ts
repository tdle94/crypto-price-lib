export default class URLRequest {
    scheme: string;
    host: string;
    path: string;
    queryItems: URLQueryItem[] = [];

    getURLString(): string {
        if (!this.isSchemeValid()) {
            throw new TypeError("invalid scheme")
        }

        if (!this.isHostValid()) {
            throw new TypeError("invalid host")
        }

        if (!this.isPathValid()) {
            throw new TypeError("invalid path")
        }

        var fullURL: string = `${this.scheme}://${this.host}${this.path}`;

        this.queryItems.forEach( (item, index) => {
            if (item.value !== undefined) {
                if (index === 0) {
                    if (Array.isArray(item.value)) {
                        item.value.forEach((element, index) => {
                            if (index == 0) {
                                fullURL = `${fullURL}?${element.name}=${element.name}`;
                            } else {
                                fullURL = `${fullURL}&${element.name}=${element.name}`;
                            }
                        })
                    } else {
                        fullURL = `${fullURL}?${item.name}=${item.name}`;
                    }
                } else {
                    if (Array.isArray(item.value)) {
                        item.value.forEach(element => {
                            fullURL = `${fullURL}&${element.name}=${element.name}`;
                        })
                    } else {
                        fullURL = `${fullURL}&${item.name}=${item.name}`;
                    }
                }
            }
        });

        return fullURL
    }

    private isSchemeValid(): boolean {
        return this.scheme === "http" || this.scheme == "https"
    }

    private isHostValid(): boolean {
        return this.host.length <= 253 && this.host.match('^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$').length > 0
    }

    private isPathValid(): boolean {
        return this.path.match('^\/[/.a-zA-Z0-9-_]+').length > 0
    }
}

export class URLQueryItem {
    readonly name: string;
    readonly value: unknown;

    constructor(name: string, value: unknown) {
        this.name = name;
        this.value = value;
    }
}