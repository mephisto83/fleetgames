using Fleet.Resouce.Controller.Data;
using RedQuick.Controllers;
using RedQuick.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;
using RedQuick.Interfaces.Data;
using System.Threading.Tasks;

namespace Fleet.Resource.Service.Controllers
{

    [Authorize]
    [RoutePrefix("api/agent")]
    public class AgentController : RedController<Agent, IRedMaestro<Agent>>
    {

        public virtual Task<IRedUserRole> GetRole(IRedUser user)
        {
            throw new NotImplementedException();
        }

        public virtual IRedUser GetRedUser()
        {
            throw new NotImplementedException();
        }
    }
    public class AgentUser : IRedUserRole, IRedUser
    {
        public string Id
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        public string Owner
        {
            get
            {
                throw new NotImplementedException();
            }

            set
            {
                throw new NotImplementedException();
            }
        }

        public string Role
        {
            get
            {
                throw new NotImplementedException();
            }

            set
            {
                throw new NotImplementedException();
            }
        }

        public string UserType
        {
            get
            {
                throw new NotImplementedException();
            }

            set
            {
                throw new NotImplementedException();
            }
        }
    }
}