import type { ILogger } from '@rudderstack/analytics-js-common/types/Logger';
import type { Nullable } from '@rudderstack/analytics-js-common/types/Nullable';
import type { ApiObject } from '@rudderstack/analytics-js-common/types/ApiObject';
import type { APIEvent, ApiOptions } from '@rudderstack/analytics-js-common/types/EventApi';
import type { RudderContext, RudderEvent } from '@rudderstack/analytics-js-common/types/Event';
import { getEnrichedEvent, getUpdatedPageProperties } from './utilities';

class RudderEventFactory {
  logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  /**
   * Generate a 'page' event based on the user-input fields
   * @param category Page's category
   * @param name Page name
   * @param properties Page properties
   * @param options API options
   */
  generatePageEvent(
    category?: string,
    name?: string,
    properties?: Nullable<ApiObject>,
    options?: Nullable<ApiOptions>,
  ): RudderEvent {
    let props = properties ?? {};
    props = getUpdatedPageProperties(props, options);

    const pageEvent: Partial<RudderEvent> = {
      properties: props,
      name,
      category,
      type: 'page',
    };

    return getEnrichedEvent(pageEvent, options, props, this.logger);
  }

  /**
   * Generate a 'track' event based on the user-input fields
   * @param event The event name
   * @param properties Event properties
   * @param options API options
   */
  generateTrackEvent(
    event: string,
    properties?: Nullable<ApiObject>,
    options?: Nullable<ApiOptions>,
  ): RudderEvent {
    const trackEvent: Partial<RudderEvent> = {
      properties,
      event,
      type: 'track',
    };

    return getEnrichedEvent(trackEvent, options, undefined, this.logger);
  }

  /**
   * Generate an 'identify' event based on the user-input fields
   * @param userId New user ID
   * @param traits new traits
   * @param options API options
   */
  generateIdentifyEvent(
    userId?: Nullable<string>,
    traits?: Nullable<ApiObject>,
    options?: Nullable<ApiOptions>,
  ): RudderEvent {
    const identifyEvent: Partial<RudderEvent> = {
      userId,
      type: 'identify',
      context: {
        traits,
      } as RudderContext,
    };

    return getEnrichedEvent(identifyEvent, options, undefined, this.logger);
  }

  /**
   * Generate an 'alias' event based on the user-input fields
   * @param to New user ID
   * @param from Old user ID
   * @param options API options
   */
  generateAliasEvent(to: string, from?: string, options?: Nullable<ApiOptions>): RudderEvent {
    const aliasEvent: Partial<RudderEvent> = {
      previousId: from,
      type: 'alias',
    };

    const enrichedEvent = getEnrichedEvent(aliasEvent, options, undefined, this.logger);
    // override the User ID from the API inputs
    enrichedEvent.userId = to ?? enrichedEvent.userId;
    return enrichedEvent;
  }

  /**
   * Generate a 'group' event based on the user-input fields
   * @param groupId New group ID
   * @param traits new group traits
   * @param options API options
   */
  generateGroupEvent(
    groupId?: Nullable<string>,
    traits?: Nullable<ApiObject>,
    options?: Nullable<ApiOptions>,
  ): RudderEvent {
    const groupEvent: Partial<RudderEvent> = {
      type: 'group',
    };

    if (groupId) {
      groupEvent.groupId = groupId;
    }

    if (traits) {
      groupEvent.traits = traits;
    }

    return getEnrichedEvent(groupEvent, options, undefined, this.logger);
  }

  /**
   * Generates a new RudderEvent object based on the user-input fields
   * @param event API event parameters object
   * @returns A RudderEvent object
   */
  create(event: APIEvent): RudderEvent {
    let eventObj: RudderEvent | undefined;
    switch (event.type) {
      case 'page':
        eventObj = this.generatePageEvent(
          event.category,
          event.name,
          event.properties,
          event.options,
        );
        break;
      case 'track':
        eventObj = this.generateTrackEvent(event.name as string, event.properties, event.options);
        break;
      case 'identify':
        eventObj = this.generateIdentifyEvent(event.userId, event.traits, event.options);
        break;
      case 'alias':
        eventObj = this.generateAliasEvent(event.to as string, event.from, event.options);
        break;
      case 'group':
      default:
        eventObj = this.generateGroupEvent(event.groupId, event.traits, event.options);
        break;
    }
    return eventObj;
  }
}

export { RudderEventFactory };
