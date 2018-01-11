using Fleet.Resouce.Controller;
using Fleet.Resouce.Controller.Data;
using RedQuick.Controllers;
using RedQuick.Interfaces;
using RedQuick.Interfaces.Arbiter;
using RedQuick.Interfaces.Data;
using RedQuick.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Fleet.Resource.Service.Controllers
{
    [RoutePrefix("api/ship")]
    public class ShipController : RedController<Ship, IRedMaestro<Ship>>
    {
        [Route("should/make")]
        [HttpPost]
        public async Task<bool> ShouldMakeShip(string agentId)
        {
            bool result = false;
            await Helpers.IfAgent(agentId, async (agent) =>
             {

                 var arbiter = RedStrapper.Resolve<IRedArbiter<Ledger>>();

                 var ledgers = await arbiter.GetAll<Ledger>();
                 foreach (var ledger in ledgers.Skip(1))
                 {
                     await arbiter.Delete(ledger.Id);
                 }
                 var officialLedger = ledgers.FirstOrDefault();
                 if (officialLedger == null)
                 {
                     officialLedger = await arbiter.Create(Ledger.Default());
                 }
                 if (officialLedger.LastShipBuild == null || officialLedger.LastShipBuild.Value.AddMinutes(FleetConfiguration.ShipBuildRelease) < DateTime.UtcNow)
                 {
                     result = true;
                 }
             });

            return result;
        }

        public Agent Agent { get; set; }
        public override IRedUser GetRedUser()
        {
            return Agent;
        }
        public override Task<IRedUserRole> GetRole(IRedUser user)
        {
            return Task.FromResult(Agent as IRedUserRole);
        }
        [Route("create")]
        public override async Task<Ship> Create(Ship ship)
        {
            Ship result = null;
            await Helpers.IfAgent(ship.AgentId, async (agent) =>
            {
                Agent = agent;
                ship.AgentId = ship.AgentId.Substring(0, 100);
                var maestro = await GetMaestro();

                result = await maestro.Create(ship);
            });

            return result;
        }
    }

    public class Helpers
    {
        public static async Task IfAgent(string agentId, Func<Agent, Task> p)
        {
            var arbiter = RedStrapper.Resolve<IRedArbiter<Agent>>();
            var agent = (await arbiter.GetBy(x => x.Key == agentId)).FirstOrDefault();
            if (agent != null)
            {
                await p(agent);
            }
        }

    }
}
