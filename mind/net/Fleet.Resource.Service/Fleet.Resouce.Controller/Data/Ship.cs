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
        public string MaterialResource { get; set; }
        public Resource Material { get; set; }
        public string ModelResource { get; set; }
        public Resource Model { get; set; }
        public IDictionary<string, IList<string>> Attributes { get; set; }

        public static bool CanClaim(Ship ship)
        {
            if (ship.Owner == null)
            { return true; }
            return false;
        }

        public static Ship Own(Ship ship, FleetUser user)
        {
            ship.Owner = user.Id;
            return ship;
        }
    }

    public class ShipAttributes
    {
        public const string LENGTH = "LENGTH";
        public const string WIDTH = "WIDTH";
        public const string HEIGHT = "HEIGHT";
    }
}
