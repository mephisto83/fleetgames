import bpy
import sys
import os.path
import json
argv = sys.argv
try:
    index = argv.index("--") + 1
except:
    index = len(argv)

argv = argv[index:]
print(argv)

_seed = 1
_limit = 51
_percentage=61
_name="generated.obj"

if(argv[0]):
	_seed = int(argv[0])

if(argv[1]):
	_limit = int(argv[1])

if(argv[2]):
	_percentage = int(argv[2])
    
if(argv[3]):
	_name = (argv[3])


bpy.ops.object.fleetmaker(seed=_seed, limit=_limit, percentage=_percentage,filename=_name)
