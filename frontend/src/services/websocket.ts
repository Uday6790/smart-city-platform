import {
  Client,
  type IMessage
} from "@stomp/stompjs";

import SockJS from "sockjs-client";

import type {
  SensorWebSocketData
} from "../types/city";

import {
  WEBSOCKET_URL
} from "../utils/constants";

export function connectWebSocket(
  onMessage: (
    data: SensorWebSocketData
  ) => void
): () => void {

  const client = new Client({

    webSocketFactory: () =>
      new SockJS(WEBSOCKET_URL),

    reconnectDelay: 5000,

    heartbeatIncoming: 10000,

    heartbeatOutgoing: 10000,

    onConnect: () => {

      console.log(
        "WebSocket connected"
      );

      client.subscribe(
        "/topic/sensors",
        (message: IMessage) => {

          try {

            const data =
              JSON.parse(
                message.body
              ) as SensorWebSocketData;

            onMessage(data);

          } catch (error) {

            console.error(
              "WebSocket message error:",
              error
            );

          }
        }
      );
    },

    onStompError: (frame) => {

      console.error(
        "STOMP error:",
        frame.headers["message"]
      );

      console.error(
        frame.body
      );
    },

    onWebSocketError: (error) => {

      console.error(
        "WebSocket error:",
        error
      );
    },

    onDisconnect: () => {

      console.log(
        "WebSocket disconnected"
      );
    }
  });

  client.activate();

  return () => {
    void client.deactivate();
  };
}