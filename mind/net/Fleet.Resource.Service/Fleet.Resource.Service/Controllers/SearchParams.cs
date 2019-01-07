using System;

namespace Fleet.Resource.Service.Controllers
{
    public class SearchParams
    {
        public DateTime End { get; set; }
        public bool OnlyAvailableShips { get; set; }
        public DateTime Start { get; set; }
    }
}