import java.io.IOException; 

import com.swirlds.platform.FCDataInputStream;
import com.swirlds.platform.FCDataOutputStream;
import com.swirlds.platform.FastCopyable;
import com.swirlds.platform.Utilities;

public class Resource implements FastCopyable {

	private Long id;
	private int type;
	private int[] values;
    private Long x;
    private Long y;
    private Long z;
    
    private float i;
    private float j;
    private float k;
    private float w;
    
    private int dimension;
	
	public static Resource Default() {
		Resource resource = new Resource();
		return resource;
	}
	
	@Override
	public FastCopyable copy() {
		// TODO Auto-generated method stub
		Resource copy = new Resource();
		copy.dimension = this.dimension;
		copy.id=this.id;
		copy.type = this.type;
		copy.values =  this.values.clone();
		copy.x= this.x;
		copy.y= this.y;
		copy.z= this.z;
		copy.i = this.i;
		copy.j = this.j;
		copy.k = this.k;
		copy.w = this.w;
		return copy;
	}

	@Override
	public void copyFrom(FCDataInputStream inStream) throws IOException {
		// TODO Auto-generated method stub
		try {
			dimension = inStream.readInt();
			id = inStream.readLong();
			values = Utilities.readIntArray(inStream);
			x = inStream.readLong();
			y = inStream.readLong();
			z = inStream.readLong();
			i = inStream.readFloat();
			j = inStream.readFloat();
			k = inStream.readFloat();
			w = inStream.readFloat();
			
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void copyTo(FCDataOutputStream outStream) throws IOException {
		// TODO Auto-generated method stub
		try { 
			outStream.writeLong(dimension);
			outStream.writeLong(id); 
			Utilities.writeIntArray(outStream, values);
			outStream.writeLong(x);
			outStream.writeLong(y);
			outStream.writeLong(z);
			outStream.writeFloat(i);
			outStream.writeFloat(j);
			outStream.writeFloat(k);
			outStream.writeFloat(w);
		
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
