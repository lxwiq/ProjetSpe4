import { Injectable, isDevMode } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * Log levels for the application
 */
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4
}

/**
 * Configuration for the logging service
 */
export interface LoggingConfig {
  minLevel: LogLevel;
  productionLevel: LogLevel;
  enableLogsInProduction: boolean;
}

/**
 * Service for centralized logging with production-friendly behavior
 */
@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  // Default configuration
  private config: LoggingConfig = {
    minLevel: LogLevel.DEBUG,
    productionLevel: LogLevel.ERROR,
    enableLogsInProduction: false
  };

  // Flag to determine if we're in production mode
  private isProduction = environment.production;

  constructor() {
    // Log the current environment and configuration when the service is initialized
    this.logInitialization();
  }

  /**
   * Configure the logging service
   * @param config Configuration options
   */
  configure(config: Partial<LoggingConfig>): void {
    this.config = { ...this.config, ...config };
    this.logInitialization();
  }

  /**
   * Log a debug message
   * @param message The message to log
   * @param context Optional context object
   */
  debug(message: string, context?: any): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  /**
   * Log an info message
   * @param message The message to log
   * @param context Optional context object
   */
  info(message: string, context?: any): void {
    this.log(LogLevel.INFO, message, context);
  }

  /**
   * Log a warning message
   * @param message The message to log
   * @param context Optional context object
   */
  warn(message: string, context?: any): void {
    this.log(LogLevel.WARN, message, context);
  }

  /**
   * Log an error message
   * @param message The message or error to log
   * @param context Optional context object
   */
  error(message: string | Error, context?: any): void {
    const errorMessage = message instanceof Error ? 
      `${message.name}: ${message.message}\n${message.stack}` : 
      message;
    
    this.log(LogLevel.ERROR, errorMessage, context);
  }

  /**
   * Internal method to log a message at a specific level
   * @param level The log level
   * @param message The message to log
   * @param context Optional context object
   */
  private log(level: LogLevel, message: string, context?: any): void {
    // Check if we should log based on environment and level
    if (!this.shouldLog(level)) {
      return;
    }

    const timestamp = new Date().toISOString();
    const levelName = LogLevel[level];
    const contextStr = context ? ` [${this.formatContext(context)}]` : '';
    const formattedMessage = `[${timestamp}] [${levelName}]${contextStr}: ${message}`;

    switch (level) {
      case LogLevel.DEBUG:
        console.debug(formattedMessage);
        if (context) console.debug(context);
        break;
      case LogLevel.INFO:
        console.info(formattedMessage);
        if (context) console.info(context);
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage);
        if (context) console.warn(context);
        break;
      case LogLevel.ERROR:
        console.error(formattedMessage);
        if (context) console.error(context);
        break;
    }
  }

  /**
   * Determine if a message at the given level should be logged
   * @param level The log level to check
   * @returns True if the message should be logged
   */
  private shouldLog(level: LogLevel): boolean {
    // In production, use the production level setting
    if (this.isProduction) {
      // If logs are disabled in production, don't log anything
      if (!this.config.enableLogsInProduction) {
        return false;
      }
      // Otherwise, check against the production level
      return level >= this.config.productionLevel;
    }
    
    // In development, check against the minimum level
    return level >= this.config.minLevel;
  }

  /**
   * Format a context object for logging
   * @param context The context object
   * @returns A string representation of the context
   */
  private formatContext(context: any): string {
    if (typeof context === 'string') {
      return context;
    }
    
    if (typeof context === 'object') {
      // If it's a class instance, use the constructor name
      if (context.constructor && context.constructor.name) {
        return context.constructor.name;
      }
      
      // Otherwise try to create a meaningful string
      try {
        return JSON.stringify(context);
      } catch (e) {
        return 'Object';
      }
    }
    
    return String(context);
  }

  /**
   * Log information about the logging service initialization
   */
  private logInitialization(): void {
    const mode = this.isProduction ? 'Production' : 'Development';
    const minLevel = LogLevel[this.config.minLevel];
    const prodLevel = LogLevel[this.config.productionLevel];
    const enabledInProd = this.config.enableLogsInProduction ? 'Yes' : 'No';
    
    // Always log this to console directly, as the service is still initializing
    console.info(
      `Logging Service Initialized:\n` +
      `- Mode: ${mode}\n` +
      `- Min Level: ${minLevel}\n` +
      `- Production Level: ${prodLevel}\n` +
      `- Enabled in Production: ${enabledInProd}`
    );
  }
}
