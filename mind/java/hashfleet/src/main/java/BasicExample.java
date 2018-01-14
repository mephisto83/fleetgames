/*
 * socket.io-java-client Test.java
 *
 * Copyright (c) 2012, Enno Boland
 * socket.io-java-client is a implementation of the socket.io protocol in Java.
 *
 * See LICENSE file for more information
 */
import io.socket.client.*;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;

public class BasicExample {
    public static void main(String[] args) {
        try {
            System.out.println("Starting basic example");
            new BasicExample();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    private io.socket.client.Socket socket;

    public BasicExample() throws Exception {
        System.out.println("creating a socket");
        socket = IO.socket("http://localhost:3000");
        System.out.println("created socket");
        System.out.println("connecting to socket");
        socket.on(Socket.EVENT_CONNECT, new Emitter.Listener() {

            @Override
            public void call(Object... args) {
                System.out.println("connected");
                socket.emit("foo", "hi");
                System.out.println("disconnecting");
                socket.disconnect();
            }

        }).on("event", new Emitter.Listener() {

            @Override
            public void call(Object... args) {
                System.out.println("an event occurred");
            }

        }).on(Socket.EVENT_DISCONNECT, new Emitter.Listener() {

            @Override
            public void call(Object... args) {
                System.out.println("fired disconnect event.");
            }

        });
        socket.connect();
    }


}
