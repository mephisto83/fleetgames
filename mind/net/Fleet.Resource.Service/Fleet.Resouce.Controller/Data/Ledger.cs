using RedQuick.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fleet.Resouce.Controller.Data
{
    public class Ledger : DBaseData
    {
        public DateTime? LastShipBuild { get; set; }
        public static Ledger Default()
        {
            return new Ledger
            {

            };
        }
    }
}
