/**
 * Custom Console logger.
 */
export class Logger {
    
  constructor() {    
  }
  
  /**
   * Logs message to the console.
   * @param msg     Message to log.
   * @param msgType Type of message (Normal, Warning, Error).
   */
  public log(msg: string = '', msgType: MessageType = MessageType.Normal): void {
    switch (msgType) {
      case MessageType.Normal:
        this.logNormal(msg);
        break;
          
      case MessageType.Warning:
        this.logWarning(msg);
        break;

      case MessageType.Error:
        this.logError(msg);
        break;

      default:
        break;
    }
  }
  
  /**
   * Logs message in the upper case to the console with text color set to red
   *  and background color to gray.
   * @param message Message to log.
   */
  private logError(message: string) {
    message = message.toLocaleUpperCase();
    console.log(`%c ${message}`, 'background: #222; color: #FF0000');
  }
  
  /**
   * Logs message to the console.
   * @param message Message to log.
   */
  private logNormal(message: string) {
    console.log(message);
  }

  /**
   * Logs message to the console with text color set to yellow
   *  and background color to gray.
   * @param message Message to log.
   */
  private logWarning(message: string) {
    console.log(`%c ${message}`, 'background: #222; color: #BADA55');
  }
}

/**
 * Type of messages.
 */
export enum MessageType {
  Normal,
  Warning,
  Error,
}