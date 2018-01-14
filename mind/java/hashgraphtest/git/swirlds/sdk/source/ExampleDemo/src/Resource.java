import java.io.IOException;

import com.swirlds.platform.FCDataInputStream;
import com.swirlds.platform.FCDataOutputStream;
import com.swirlds.platform.FastCopyable;
import com.swirlds.platform.Utilities;

public class Resource implements FastCopyable {

	private String id
	private int value;
	private int type;
    private Long x;
    private Long y;
    private Long z;
    private int dimension;
	
	public static Resource Default() {
		Resource user = new Resource();
        
		return user;
	}
	
	@Override
	public FastCopyable copy() {
		// TODO Auto-generated method stub
		Resource copy = new Resource();
		copy.resourceIds = copy.resourceIds.clone();
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
			resourceIds = Utilities.readIntArray(inStream);
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
			Utilities.writeIntArray(outStream, resourceIds);
			outStream.writeInt(money);
			outStream.writeInt(gas );
			outStream.writeInt(ore );
			outStream.writeInt(plasma );
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
