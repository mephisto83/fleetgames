using RedQuick.Data;
using RedQuick.Interfaces.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fleet.Resouce.Controller.Data
{
    public class Agent : DBaseData, IRedUser, IRedUserRole
    {
        public string Key { get; set; }

        public string Role
        {
            get
            {
                return "agent";
            }

            set
            {
            }
        }

        public string UserType
        {
            get
            {
                return "agent";
            }

            set
            { 
            }
        }
    }
}
