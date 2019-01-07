using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using RedQuick.Storage;
using System.Threading.Tasks;
using Fleet.Resource.Service.Controllers;
using Fleet.Resouce.Controller.Data;
using RedQuick.Util;
using RedQuick.Interfaces.Arbiter;
using System.Linq;

namespace Fleet.Resource.Tests
{
    [TestClass]
    public class UnitTest1
    {
        [TestInitialize]
        public void Setup()
        {
            RedStorage.Clear().GetAwaiter().GetResult();
        }

        [TestMethod]
        public async Task SetupEnvironment()
        {
            await RedStorage.InitCollections(RedStorage.DatabaseId);
        }
        static Random random = new Random();
        private static string RandomString(int Size)
        {
            string input = "abcdefghijklmnopqrstuvwxyz0123456789";
            var chars = Enumerable.Range(0, Size)
                                   .Select(x => input[random.Next(0, input.Length)]);
            return new string(chars.ToArray());
        }
        [TestMethod]
        public async Task CreateAgent()
        {
            var controller = RedStrapper.Resolve<IRedArbiter<Agent>>();

            var res = await controller.Create(new Agent
            {
                Key = RandomString(1123)
            });
        }

        [TestMethod]
        public async Task ShouldMakeShip()
        {
            var arbiter = RedStrapper.Resolve<IRedArbiter<Agent>>();
            var agent = (await arbiter.GetAll<Agent>()).FirstOrDefault();
            var controller = new ShipController();
            var result = await controller.ShouldMakeShip(agent.Key);
            Assert.IsTrue(result);
        }

        [TestMethod]
        public async Task GetShips()
        {
            var controller = new ShipController();
            var arbiter = RedStrapper.Resolve<IRedArbiter<Ship>>();
            var ships = await arbiter.GetAll<Ship>();
            foreach (var s in ships)
            {
                await arbiter.Delete(s.Id);
            }
            var ship = await arbiter.Create(new Ship { });
            ships = await controller.GetShips(new SearchParams { Start = DateTime.UtcNow.AddDays(-1), End = DateTime.UtcNow });
            Assert.AreEqual(ships.Count, 1);
        }

        [TestMethod]
        public async Task GetShips_onlyavailable()
        {
            var controller = new ShipController();
            var arbiter = RedStrapper.Resolve<IRedArbiter<Ship>>();
            var ships = await arbiter.GetAll<Ship>();
            foreach (var s in ships)
            {
                await arbiter.Delete(s.Id);
            }
            var ship = await arbiter.Create(new Ship { });
            ships = await controller.GetShips(new SearchParams { OnlyAvailableShips = true, Start = DateTime.UtcNow.AddDays(-1), End = DateTime.UtcNow });
            Assert.AreEqual(ships.Count, 1);
        }

    }
}
