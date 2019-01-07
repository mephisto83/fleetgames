
/*
 * This file is public domain.
 *
 * SWIRLDS MAKES NO REPRESENTATIONS OR WARRANTIES ABOUT THE SUITABILITY OF 
 * THE SOFTWARE, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED 
 * TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE, OR NON-INFRINGEMENT. SWIRLDS SHALL NOT BE LIABLE FOR 
 * ANY DAMAGES SUFFERED AS A RESULT OF USING, MODIFYING OR 
 * DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.
 */

import java.nio.charset.StandardCharsets;

import com.swirlds.platform.Browser;
import com.swirlds.platform.Console;
import com.swirlds.platform.Platform;
import com.swirlds.platform.SwirldMain;
import com.swirlds.platform.SwirldState;


import java.io.*;
import java.net.*;
/**
 * This HelloSwirld creates a single transaction, consisting of the string "Hello Swirld", and then goes
 * into a busy loop (checking once a second) to see when the state gets the transaction. When it does, it
 * prints it, too.
 */
public class ExampleDemoMain implements SwirldMain {
	/** the platform running this app */
	public Platform platform;
	/** ID number for this member */
	public int selfId;
	/** a console window for text output */
	public Console console;
	/** sleep this many milliseconds after each sync */
	public final int sleepPeriod = 10;
	boolean connected = false;

    Socket socket;
    PrintWriter outStream;
    BufferedReader stdIn;
	/**
	 * This is just for debugging: it allows the app to run in Eclipse. If the config.txt exists and lists a
	 * particular SwirldMain class as the one to run, then it can run in Eclipse (with the green triangle
	 * icon).
	 * 
	 * @param args
	 *            these are not used
	 */
	public static void main(String[] args) {
		Browser.main(null);
	}

	// ///////////////////////////////////////////////////////////////////

	@Override
	public void preEvent() {
	}

	@Override
	public void init(Platform platform, int id) {
		this.platform = platform;
		this.selfId = id;
		this.console = platform.createConsole(true); // create the window, make it visible
		platform.setAbout("Hello 2 Swirld v. 1.0\n"); // set the browser's "about" box
		platform.setSleepAfterSync(sleepPeriod);
	}

	@Override
	public void run() {
		String myName = platform.getState().getAddressBookCopy()
				.getAddress(selfId).getSelfName();

		console.out.println("Hello Swirld from updated" + myName);
		ExampleDemoState tempState = (ExampleDemoState)platform.getState();
		UserState tempUserState = tempState.getUserState(platform.getState().getAddressBookCopy().getAddress(selfId).getId());
		ExampleDemoState state;
		// create a transaction. For this example app,
		// we will define each transactions to simply
		// be a string in UTF-8 encoding.
		byte[] transaction = myName.getBytes(StandardCharsets.UTF_8);

		// Send the transaction to the Platform, which will then
		// forward it to the State object.
		// The Platform will also send the transaction to
		// all the other members of the community during syncs with them.
		// The community as a whole will decide the order of the transactions
		platform.createTransaction(transaction, null);
		if(tempUserState == null) {
			platform.createTransaction(ExampleDemoState.NEW_USER.getBytes(StandardCharsets.UTF_8),null);
		}
		
		String lastReceived = "";
		System.out.println("creating a socket");
      
        System.out.println("created socket");
        System.out.println("connecting to socket");
        String hostName = "127.0.0.1";
        
        try {
			socket = new Socket(hostName, 3000);
			System.out.println("socket created");
			  	stdIn =
	                new BufferedReader(
	                    new InputStreamReader(socket.getInputStream()));
						System.out.println("created in buffered reader");
	        
	            outStream =
	                    new PrintWriter(socket.getOutputStream(), true);
						System.out.println("created out stream");
		} catch (UnknownHostException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		System.out.println("getting address");
        Long addressId = platform.getState().getAddressBookCopy().getAddress(selfId).getId();
		System.out.println(addressId );
        UserState receivedUserState = null;
		while (true) {
			state = (ExampleDemoState) platform
					.getState();
			String received = state.getReceived();
			if(connected)
			{ 
			}
			String userInput;
			UserState userstate = state.getUserState(addressId);
            //while ((userInput = stdIn.readLine()) != null) {
                // outStream.println(userInput);
                // System.out.println("echo: " + in.readLine());
            //}
			if(receivedUserState == null && userstate != null)
			{ 
				receivedUserState = userstate;
			//System.out.println("user state received");
			}
			try {
				userInput = stdIn.readLine();
				if(userInput != null) {
					//System.out.println(userInput);
					transaction = userInput.getBytes(StandardCharsets.UTF_8);
					platform.createTransaction(transaction, null);
				}
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			if(userstate != null) {
				//console.out.println("Received updated: " + received); // print all received transactions
			}
			if (!lastReceived.equals(received)) {
				lastReceived = received;
				if(userstate!=null)
					outStream.println(userstate.toString());
				// console.out.println("Received updated: " + received); // print all received transactions
			}
			try {
				Thread.sleep(sleepPeriod);
			} catch (Exception e) {
			}
		}
	}

	@Override
	public SwirldState newState() {
		return new ExampleDemoState();
	}
}