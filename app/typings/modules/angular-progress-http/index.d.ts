// Generated by typings
// Source: lib/angular-progress-http/lib/ProgressBrowserXhr.d.ts
declare module '~angular-progress-http/lib/ProgressBrowserXhr' {
import { BrowserXhr } from '@angular/http';
export class ProgressBrowserXhr implements BrowserXhr {
    private browserXhr;
    private upload;
    private download;
    constructor(browserXhr: BrowserXhr, upload?: any, download?: any);
    build(): any;
    private createProgressListener(listener);
}
}
declare module 'angular-progress-http/lib/ProgressBrowserXhr' {
export * from '~angular-progress-http/lib/ProgressBrowserXhr';
}

// Generated by typings
// Source: lib/angular-progress-http/lib/ProgressBrowserXhrFactory.d.ts
declare module '~angular-progress-http/lib/ProgressBrowserXhrFactory' {
import { BrowserXhr } from '@angular/http';
import { ProgressBrowserXhr } from '~angular-progress-http/lib/ProgressBrowserXhr';
import { Progress } from '~angular-progress-http/lib/interfaces/index';
export class ProgressBrowserXhrFactory {
    private browserXhr;
    constructor(browserXhr: BrowserXhr);
    create(upload: (progress: Progress) => void, download: (progress: Progress) => void): ProgressBrowserXhr;
}
}
declare module 'angular-progress-http/lib/ProgressBrowserXhrFactory' {
export * from '~angular-progress-http/lib/ProgressBrowserXhrFactory';
}

// Generated by typings
// Source: lib/angular-progress-http/lib/XHRBackendFactory.d.ts
declare module '~angular-progress-http/lib/XHRBackendFactory' {
import { XHRBackend, ResponseOptions, XSRFStrategy } from '@angular/http';
import { Progress } from '~angular-progress-http/lib/interfaces/index';
import { ProgressBrowserXhrFactory } from '~angular-progress-http/lib/ProgressBrowserXhrFactory';
export class XHRBackendFactory {
    private responseOptions;
    private xsrfStrategy;
    private progressBrowserXhrFactory;
    constructor(responseOptions: ResponseOptions, xsrfStrategy: XSRFStrategy, progressBrowserXhrFactory: ProgressBrowserXhrFactory);
    create(upload: (progress: Progress) => void, download: (progress: Progress) => void): XHRBackend;
}
}
declare module 'angular-progress-http/lib/XHRBackendFactory' {
export * from '~angular-progress-http/lib/XHRBackendFactory';
}

// Generated by typings
// Source: lib/angular-progress-http/lib/progress-http.module.d.ts
declare module '~angular-progress-http/lib/progress-http.module' {
import { RequestOptions, XHRBackend } from '@angular/http';
import { XHRBackendFactory } from '~angular-progress-http/lib/XHRBackendFactory';
import { ProgressHttp } from '~angular-progress-http/lib/progress-http.service';
import { HttpFactory } from '~angular-progress-http/lib/interfaces/index';
export function progressHttpFactory(xhrBackendFactory: XHRBackendFactory, backend: XHRBackend, requestOptions: RequestOptions, httpFactory: HttpFactory): ProgressHttp;
export class ProgressHttpModule {
}
}
declare module 'angular-progress-http/lib/progress-http.module' {
export * from '~angular-progress-http/lib/progress-http.module';
}

// Generated by typings
// Source: lib/angular-progress-http/lib/progress-http.service.d.ts
declare module '~angular-progress-http/lib/progress-http.service' {
import { Http, RequestOptionsArgs, RequestOptions, Request, Response, ConnectionBackend } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpWithDownloadProgressListener, HttpWithUploadProgressListener, Progress } from '~angular-progress-http/lib/interfaces/index';
import { XHRBackendFactory } from '~angular-progress-http/lib/XHRBackendFactory';
import { HttpFactory } from '~angular-progress-http/lib/interfaces/index';
export class ProgressHttp extends Http implements HttpWithUploadProgressListener, HttpWithDownloadProgressListener {
    private xhrBackendFactory;
    private requestOptions;
    private httpFactory;
    private _uploadCallback;
    private _downloadCallback;
    private http;
    constructor(xhrBackendFactory: XHRBackendFactory, requestOptions: RequestOptions, httpFactory: HttpFactory, backend: ConnectionBackend);
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response>;
    withDownloadProgressListener(listener: (progress: Progress) => void): HttpWithDownloadProgressListener;
    withUploadProgressListener(listener: (progress: Progress) => void): HttpWithUploadProgressListener;
    private _buildProgressHttpInstance();
    private _buildXHRBackend();
}
}
declare module 'angular-progress-http/lib/progress-http.service' {
export * from '~angular-progress-http/lib/progress-http.service';
}

// Generated by typings
// Source: lib/angular-progress-http/lib/AngularHttpFactory.d.ts
declare module '~angular-progress-http/lib/AngularHttpFactory' {
import { Http, RequestOptions, ConnectionBackend } from '@angular/http';
import { HttpFactory } from '~angular-progress-http/lib/interfaces/index';
export class AngularHttpFactory implements HttpFactory {
    create(backend: ConnectionBackend, requestOptions: RequestOptions): Http;
}
}
declare module 'angular-progress-http/lib/AngularHttpFactory' {
export * from '~angular-progress-http/lib/AngularHttpFactory';
}

// Generated by typings
// Source: lib/angular-progress-http/lib/interfaces/HttpWithDownloadProgressListener.d.ts
declare module '~angular-progress-http/lib/interfaces/HttpWithDownloadProgressListener' {
import { Http } from '@angular/http';
import { Progress } from '~angular-progress-http/lib/interfaces/Progress';
export interface HttpWithDownloadProgressListener extends Http {
    withUploadProgressListener(listener: (progress: Progress) => void): Http;
}
}
declare module 'angular-progress-http/lib/interfaces/HttpWithDownloadProgressListener' {
export * from '~angular-progress-http/lib/interfaces/HttpWithDownloadProgressListener';
}

// Generated by typings
// Source: lib/angular-progress-http/lib/interfaces/HttpWithUploadProgressListener.d.ts
declare module '~angular-progress-http/lib/interfaces/HttpWithUploadProgressListener' {
import { Http } from '@angular/http';
import { Progress } from '~angular-progress-http/lib/interfaces/Progress';
export interface HttpWithUploadProgressListener extends Http {
    withDownloadProgressListener(listener: (progress: Progress) => void): Http;
}
}
declare module 'angular-progress-http/lib/interfaces/HttpWithUploadProgressListener' {
export * from '~angular-progress-http/lib/interfaces/HttpWithUploadProgressListener';
}

// Generated by typings
// Source: lib/angular-progress-http/lib/interfaces/Progress.d.ts
declare module '~angular-progress-http/lib/interfaces/Progress' {
export interface Progress {
    event: ProgressEvent;
    lengthComputable: boolean;
    percentage?: number;
    loaded: number;
    total?: number;
}
}
declare module 'angular-progress-http/lib/interfaces/Progress' {
export * from '~angular-progress-http/lib/interfaces/Progress';
}

// Generated by typings
// Source: lib/angular-progress-http/lib/interfaces/HttpFactory.d.ts
declare module '~angular-progress-http/lib/interfaces/HttpFactory' {
import { Http, ConnectionBackend, RequestOptions } from '@angular/http';
export interface HttpFactory {
    create<T extends Http>(backend: ConnectionBackend, requestOptions: RequestOptions): T | Http;
}
}
declare module 'angular-progress-http/lib/interfaces/HttpFactory' {
export * from '~angular-progress-http/lib/interfaces/HttpFactory';
}

// Generated by typings
// Source: lib/angular-progress-http/lib/interfaces/index.d.ts
declare module '~angular-progress-http/lib/interfaces/index' {
export * from '~angular-progress-http/lib/interfaces/HttpWithDownloadProgressListener';
export * from '~angular-progress-http/lib/interfaces/HttpWithUploadProgressListener';
export * from '~angular-progress-http/lib/interfaces/Progress';
export * from '~angular-progress-http/lib/interfaces/HttpFactory';
}
declare module 'angular-progress-http/lib/interfaces/index' {
export * from '~angular-progress-http/lib/interfaces/index';
}

// Generated by typings
// Source: lib/angular-progress-http/lib/http-factory.token.d.ts
declare module '~angular-progress-http/lib/http-factory.token' {
import { OpaqueToken } from '@angular/core';
export const HTTP_FACTORY: OpaqueToken;
}
declare module 'angular-progress-http/lib/http-factory.token' {
export * from '~angular-progress-http/lib/http-factory.token';
}

// Generated by typings
// Source: lib/angular-progress-http/index.d.ts
declare module '~angular-progress-http/index' {
export { ProgressHttpModule } from '~angular-progress-http/lib/progress-http.module';
export { ProgressHttp } from '~angular-progress-http/lib/progress-http.service';
export { AngularHttpFactory } from '~angular-progress-http/lib/AngularHttpFactory';
export { HttpWithDownloadProgressListener, HttpWithUploadProgressListener, Progress, HttpFactory } from '~angular-progress-http/lib/interfaces/index';
export { HTTP_FACTORY } from '~angular-progress-http/lib/http-factory.token';
}
declare module 'angular-progress-http/index' {
export * from '~angular-progress-http/index';
}
declare module 'angular-progress-http' {
export * from '~angular-progress-http/index';
}