import bpy
import sys
import os.path
import json
argv = sys.argv
try:
    index = argv.index("--") + 1
except:
    index = len(argv)

bpy.ops.object.fleetmaker()
