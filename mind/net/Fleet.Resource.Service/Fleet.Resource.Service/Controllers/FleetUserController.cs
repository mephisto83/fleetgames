using Fleet.Resouce.Controller;
using Fleet.Resouce.Controller.Data;
using RedQuick.Controllers;
using RedQuick.Interfaces;
using RedQuick.Interfaces.Arbiter;
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
    [RoutePrefix("fleet/user")]
    [AllowAnonymous]
    public class FleetUserController : RedController<FleetUser, IRedMaestro<FleetUser>>
    {
        [Route("login")]
        [HttpPost]
        public async Task<FleetUser> Login([FromBody] FleetLogin login)
        {
            FleetUser result = null;
            if (login != null)
            {
                var arbiter = RedStrapper.Resolve<IRedArbiter<FleetUser>>();
                if (login.MachineUser)
                {
                    result = await arbiter.GetUnique<FleetUser>(x => x.MachineOwned == login.Machine && x.MachinePass == login.Pass);
                }
                if (result == null)
                {
                    result = await arbiter.GetUnique<FleetUser>(x => x.MachineOwned == login.Machine);
                    if (result != null)
                    {
                        throw new Exception("invalid");
                    }
                    else
                    {
                        result = await arbiter.Create(FleetUser.CreateMachine(login));
                    }
                }
            }

            return FleetUser.Clean(result);
        }

        [Route("claim/ship")]
        [HttpPost]
        public async Task<Ship> ClaimShip([FromBody] ClaimRequest request)
        {
            Ship result = null;

            await IsValid(request, async (user) =>
              {
                  var shipArbiter = RedStrapper.Resolve<IRedArbiter<Ship>>();
                  var ship = await shipArbiter.Get<Ship>(request.Ship);
                  if (ship != null && Ship.CanClaim(ship))
                  {
                      var ships = await shipArbiter.GetBy(x => x.Owner == user.Id);
                      if (FleetConfiguration.CanClaimMore(ships))
                      {
                          ship = Ship.Own(ship, user);
                          await shipArbiter.Update(ship);
                          result = ship;
                      }
                  }
              });

            return result;
        }

        [Route("get/my/ships")]
        [HttpPost]
        public async Task<IList<Ship>> GetShips([FromBody] FleetLogin login)
        {
            IList<Ship> result = null;

            await IsValid(login, async user =>
            {
                var shipArbiter = RedStrapper.Resolve<IRedArbiter<Ship>>();
                var ships = await shipArbiter.GetBy(x => x.Owner == user.Id);
                result = ships;
            });

            return result;
        }

        private async Task IsValid(FleetLogin request, Func<FleetUser, Task> p)
        {
            FleetUser user = null;
            var arbiter = RedStrapper.Resolve<IRedArbiter<FleetUser>>();
            if (request.MachineUser)
            {
                user = await arbiter.GetUnique<FleetUser>(x => x.MachineOwned == request.Machine && x.MachinePass == request.Pass);
            }
            if (user != null)
            {
                await p(user);
            }
        }
    }
}
