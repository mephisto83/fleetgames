import java.io.IOException;

import com.swirlds.platform.FCDataInputStream;
import com.swirlds.platform.FCDataOutputStream;
import com.swirlds.platform.FastCopyable;
import com.swirlds.platform.Utilities;

public class UserState implements FastCopyable {

	String name;
	private int money;
	private int gas;
	private int ore;
	private int plasma;
	
	public static UserState Default() {
		UserState user = new UserState();
		user.money =10000;
		user.gas = 10000;
		user.ore = 10000;
		user.plasma = 10000;
		
		return user;
	}
	
	public String toString() {
		return name+"|"+money+"|"+gas+"|"+ore+"|"+plasma;	
	}
	
	@Override
	public FastCopyable copy() {
		// TODO Auto-generated method stub
		UserState copy = new UserState();
		copy.money= copy.money;
		copy.gas = this.gas;
		copy.ore = copy.ore;
		copy.plasma = copy.plasma;
		return copy;
	}

	@Override
	public void copyFrom(FCDataInputStream inStream) throws IOException {
		// TODO Auto-generated method stub
		try {
			name =  inStream.readUTF();
			money = inStream.readInt();
			gas = inStream.readInt();
			ore = inStream.readInt();
			plasma = inStream.readInt();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void copyTo(FCDataOutputStream outStream) throws IOException {
		// TODO Auto-generated method stub
		try {
			outStream.writeUTF(name);
			outStream.writeInt(money);
			outStream.writeInt(gas );
			outStream.writeInt(ore );
			outStream.writeInt(plasma );
			
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
