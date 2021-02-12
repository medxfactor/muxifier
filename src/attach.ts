import type { RequestOptions } from 'http';
import http from 'http';
import { URL } from 'url';
import { Either, fromTryCatch, Task } from './utils';

export interface AttachRequestPayload {
  local: {
    host: string;
    port: number;
    url: string;
  };
  target: {
    url: string;
  };
}

function parseTargetUrl(url: string): Either<URL, TypeError> {
  return fromTryCatch(() => new URL(url));
}

function serializePayload(payload: AttachRequestPayload['local']): Either<string, TypeError> {
  return fromTryCatch(() => JSON.stringify({
    host: payload.host,
    port: payload.port,
    listeningUrl: payload.url,
  }));
}

class ResponseReadError extends Error { }
class UnexpectedResponseStatusCodeError extends Error { }
class RequestError extends Error { }

function issueAttachRequest(requestOptions: RequestOptions, serializedBody: string) {
  return new Task<void, ResponseReadError | UnexpectedResponseStatusCodeError | RequestError>((resolve, reject) => {
    http.request(requestOptions, (response) => {
      response.setEncoding('utf-8')
        .on('error', (error) => reject(new ResponseReadError(error.message)))
        .on('readable', () => response.resume())
        .on('end', () => {
          if (response.statusCode === 204) {
            return resolve();
          }
          return reject(new UnexpectedResponseStatusCodeError('Response status code is not 204'));
        });
    })
    .on('error', (error) => {
      reject(new RequestError(error.message));
    })
    .end(serializedBody, 'utf-8');
  });
}

export function attach(payload: AttachRequestPayload) {
  return new Task<void, string>((resolve, reject) => {
    parseTargetUrl(payload.target.url)
      .chain((parsedTargetUrl) => {
        return serializePayload(payload.local)
          .map((serializedPayload) => {
            const requestOptions = {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              host: parsedTargetUrl.hostname,
              port: parsedTargetUrl.port,
              path: '/attach',
            };

            return issueAttachRequest(requestOptions, serializedPayload)
          });
      })
    .fork(
      function handleRight(result) {
        result.fork(
          function handleTaskResolve() { resolve(); },
          function handleTaskError(error) {
            if (error instanceof RequestError) {
              return reject('Error while issuing request. ' + error.message);
            }
            if (error instanceof ResponseReadError) {
              return reject('Error while reading response. ' + error.message);
            }
            if (error instanceof UnexpectedResponseStatusCodeError) {
              return reject(error.message);
            }
          },
        );
      },
      function handleLeft(error) { reject(error.message); },
    );
  });
}