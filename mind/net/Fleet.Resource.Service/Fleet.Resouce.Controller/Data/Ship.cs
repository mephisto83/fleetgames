using RedQuick.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fleet.Resouce.Controller.Data
{
    public class Ship : DBaseData
    {
        public string AgentId { get; set; }

        public IDictionary<string, string> Attributes { get; set; }
    }

    public class ShipAttributes
    {
        public const string LENGTH = "LENGTH";
        public const string WIDTH = "WIDTH";
        public const string HEIGHT = "HEIGHT";
    }
}
