
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

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.swirlds.platform.Address;
import com.swirlds.platform.AddressBook;
import com.swirlds.platform.FCDataInputStream;
import com.swirlds.platform.FCDataOutputStream;
import com.swirlds.platform.FastCopyable;
import com.swirlds.platform.Platform;
import com.swirlds.platform.SwirldState;
import com.swirlds.platform.Utilities;

/**
 * This holds the current state of the swirld. For this simple "hello swirld" code, each transaction is just
 * a string, and the state is just a list of the strings in all the transactions handled so far, in the
 * order that they were handled.
 */
public class ExampleDemoState implements SwirldState {
	public static final String NEW_USER = "1";
	/**
	 * The shared state is just a list of the strings in all transactions, listed in the order received
	 * here, which will eventually be the consensus order of the community.
	 */
	private List<String> strings = Collections
			.synchronizedList(new ArrayList<String>());

	
	/** names and addresses of all members */
	private AddressBook addressBook;

	private Map<Long, UserState> userStates;
	
	/** @return all the strings received so far from the network */
	public synchronized List<String> getStrings() {
		return strings;
	}

	/** @return all the strings received so far from the network, concatenated into one */
	public synchronized String getReceived() {
		return strings.toString();
	}

	/** @return the same as getReceived, so it returns the entire shared state as a single string */
	public String toString() {
		return strings.toString();
	}

	// ///////////////////////////////////////////////////////////////////

	@Override
	public synchronized AddressBook getAddressBookCopy() {
		return addressBook.copy();
	}
	
	public synchronized UserState getUserState(Long id) {
		return this.userStates.getOrDefault(id, null);
	}

	@Override
	public synchronized FastCopyable copy() {
		ExampleDemoState copy = new ExampleDemoState();
		copy.copyFrom(this);
		return copy;
	}

	@Override
	public void copyTo(FCDataOutputStream outStream) {
		try {
			Utilities.writeStringArray(outStream,
					strings.toArray(new String[0]));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void copyFrom(FCDataInputStream inStream) {
		try {
			strings = new ArrayList<String>(
					Arrays.asList(Utilities.readStringArray(inStream)));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@Override
	public synchronized void copyFrom(SwirldState old) {
		strings = Collections.synchronizedList(
				new ArrayList<String>(((ExampleDemoState) old).strings));
		addressBook = ((ExampleDemoState) old).addressBook.copy();
		userStates = new HashMap<Long,UserState>(((ExampleDemoState) old).userStates);
	}

	@Override
	public synchronized void handleTransaction(long id, boolean consensus,
			Instant timeCreated, byte[] transaction, Address address) {
		String _trans = new String(transaction, StandardCharsets.UTF_8);
		switch(_trans) {
		case NEW_USER:
			Long addr = address.getId();
			UserState user = userStates.getOrDefault(address.getId(), null);
			if(user == null) {
				userStates.put(addr, UserState.Default());
			}
			break;
			default:
				strings.add(_trans);
			break;
		}
	}

	@Override
	public void noMoreTransactions() {
	}

	@Override
	public synchronized void init(Platform platform, AddressBook addressBook) {
		this.addressBook = addressBook;
		this.userStates = new HashMap<Long, UserState>();
	}
}