package com.smartcity.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    /*
     * Message broker configuration
     *
     * Frontend subscribes to:
     * /topic/sensors
     * /topic/traffic
     * /topic/buildings
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {

        config.enableSimpleBroker(
                "/topic"
        );

        config.setApplicationDestinationPrefixes(
                "/app"
        );
    }

    /*
     * WebSocket endpoint
     *
     * React frontend connects to:
     * http://localhost:8080/ws
     *
     * SockJS is enabled so the browser can
     * fall back to supported transports.
     */
    @Override
    public void registerStompEndpoints(
            StompEndpointRegistry registry) {

        registry
                .addEndpoint("/ws")
                .setAllowedOriginPatterns(
                        "http://localhost:5173",
                        "http://127.0.0.1:5173"
                )
                .withSockJS();
    }
}
