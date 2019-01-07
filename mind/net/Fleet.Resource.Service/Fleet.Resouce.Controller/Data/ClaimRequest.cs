using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fleet.Resouce.Controller.Data
{
    public class ClaimRequest : FleetLogin
    {
        public string Ship { get; set; }
    }
}
