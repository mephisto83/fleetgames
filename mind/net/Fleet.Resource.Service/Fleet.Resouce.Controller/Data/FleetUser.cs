using RedQuick.Data;
using RedQuick.Interfaces.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fleet.Resouce.Controller.Data
{
    public class FleetUser : DBaseData, IRedUser, IRedUserRole
    {
        public bool IsMachine { get; set; }

        public string MachinePass { get; set; }

        public string Role
        {
            get
            {
                return "fleetuser";
            }

            set
            {
            }
        }

        public string UserType
        {
            get
            {
                return "fleetuser";
            }

            set
            {
            }
        }

        public static FleetUser CreateMachine(FleetLogin login)
        {
            return new FleetUser
            {
                MachineOwned = login.Machine,
                MachinePass = login.Pass,
                IsMachine = true
            };
        }

        public static FleetUser Clean(FleetUser user)
        {
            if (user == null) { return null; }
            return new FleetUser
            {
                IsMachine = user.IsMachine,
                MachinePass = null,
                MachineOwned = user.MachineOwned
            };
        }
    }
}
