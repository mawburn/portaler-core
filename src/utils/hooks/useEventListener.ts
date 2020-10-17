/**
 * https://github.com/donavon/use-event-listener
 * removed dependency & added TS
 **/

import { useEffect, useRef } from 'react';

type Options = Pick<AddEventListenerOptions, 'capture' | 'passive' | 'once'>;

type EventTypes = HTMLElementEventMap & DocumentEventMap & WindowEventMap;

const useEventListener = <K extends keyof EventTypes>(
  eventName: K,
  handler: (e: EventTypes[K]) => void,
  element: HTMLElement | Document | Window | null = document,
  options: Options = {}
) => {
  const savedHandler = useRef<(e: EventTypes[K]) => void>(() => null);
  const { capture, passive, once } = options;

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;

    if (!isSupported) {
      return;
    }

    const eventListener = ((e: EventTypes[K]) =>
      savedHandler.current(e)) as EventListener;

    const opts = { capture, passive, once };

    element?.addEventListener(eventName, eventListener, opts);

    return () => {
      element?.removeEventListener(eventName, eventListener, opts);
    };
  }, [eventName, element, capture, passive, once]);
};

export default useEventListener;
