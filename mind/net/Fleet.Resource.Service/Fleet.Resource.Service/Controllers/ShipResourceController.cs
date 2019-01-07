using Fleet.Resouce.Controller.Data;
using RedQuick.Controllers;
using RedQuick.Interfaces;
using RedQuick.Interfaces.Data;
using RedQuick.Maestros;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Fleet.Resource.Service.Controllers
{

    [RoutePrefix("api/shipresource")]
    public class ShipResourceController : RedController<RedQuick.Data.Resource, RedResourceMaestro>
    {

        [Route("request/upload")]
        [HttpPost]
        public async Task<RedQuick.Data.Resource> RequestUpload([FromBody] FleetResource resource)
        {
            RedQuick.Data.Resource result = null;
            await Helpers.IfAgent(resource.AgentKey, async (agent) =>
            {
                Agent = agent;

                var maestro = await GetMaestro();
                resource.AgentKey = null;
                resource.Owner = null;

                result = await maestro.RequestUpload(resource);
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

    }
}
