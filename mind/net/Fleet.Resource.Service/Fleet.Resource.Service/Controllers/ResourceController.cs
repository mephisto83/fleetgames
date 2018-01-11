using Fleet.Resouce.Controller.Data;
using RedQuick.Controllers;
using RedQuick.Interfaces.Arbiter;
using RedQuick.Maestros;
using RedQuick.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;
using RedQuick.Interfaces.Data;

namespace Fleet.Resource.Service.Controllers
{
    [RoutePrefix("api/resource")]
    public class ResourceController : RedController<RedQuick.Data.Resource, RedResourceMaestro>
    {
        public Agent Agent { get; set; }
        public override IRedUser GetRedUser()
        {
            return Agent;
        }
        public override Task<IRedUserRole> GetRole(IRedUser user)
        {
            return Task.FromResult(Agent as IRedUserRole);
        }

        [Route("request/upload")]
        public async Task<RedQuick.Data.Resource> RequestUpload(FleetResource resource)
        {
            RedQuick.Data.Resource result = null;
            await Helpers.IfAgent(resource.AgentKey, async (agent) =>
            {
                Agent = agent;

                var maestro = await GetMaestro();

                result = await maestro.RequestUpload(resource);
            });
            return result;
        }


    }
}
