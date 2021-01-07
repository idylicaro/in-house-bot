export interface ILoggerMethod {
  (msg: string, ...args: any[]): void;
  (obj: any, msg?: string, ...args: any[]): void;
}

export interface ILogger {
  debug: ILoggerMethod;
  info: ILoggerMethod;
  warn: ILoggerMethod;
  error: ILoggerMethod;
}
