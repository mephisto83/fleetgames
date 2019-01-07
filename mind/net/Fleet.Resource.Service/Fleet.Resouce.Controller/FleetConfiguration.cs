using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Fleet.Resouce.Controller.Data;

namespace Fleet.Resouce.Controller
{
    public class FleetConfiguration
    {
        public static int ShipBuildRelease
        {
            get
            {
                int result = 0;
                if (int.TryParse(ConfigurationManager.AppSettings["ship-build-release"], out result))
                {
                    return result;
                }
                return 10;
            }
        }

        public static int FreeShips
        {
            get
            {
                int result = 0;
                if (int.TryParse(ConfigurationManager.AppSettings["free-ships"], out result))
                {
                    return result;
                }

                return 3;
            }
        }

        public static bool CanClaimMore(IList<Ship> ships)
        {
            if (ships != null)
            {
                return ships.Count < FreeShips;
            }
            return true;
        }
    }
}
