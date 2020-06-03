using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


using Doorway.Core.DAL;
using Doorway.Core.BLL;
using NUnit.Framework;

namespace Doorway.Core.Tests
{

    [TestFixture]
    public class DbTests {

        DoorwayEntities db = null;

        [SetUp]
        public void Init() {

            db = new DoorwayEntities("DEV\\SQLEXPRESS2008", "Doorway", "doorwayApp", "doorway.19");
        }

        [TearDown]
        public void Finish() {

            if (db != null)
                db.Close();
        }

        internal string GetUserNameFromAD(string login) {
            return login;
        }

        public void Example() {

            var query = db.Users.Where(u => u.Login.StartsWith("pepe")).Where(u => u.DeletedOn == null).OrderBy(u => u.CreatedOn).Skip(20).Take(10);

            var query2 = (from u in db.Users where u.Login.StartsWith("pepe") && u.DeletedOn == null orderby u.CreatedOn select u.Id).ToList();
            var usr = query.FirstOrDefault().Id;
            foreach (User u in query) {

            }

            string login = "KCS\\jencinas";

            var loggedUsr = db.Users.ByLogin(login).FirstOrDefault();
            if (loggedUsr == null) {
                User newUser = db.Users.AddNew(login, GetUserNameFromAD(login));
                if (newUser != null) {
                    db.SaveChanges();
                }
            }
        }

        string login = "Domain\\TestUser";

        [Test] 
        public void A1_AddUser_Success() {

            var loggedUsr = db.Users.ByLogin(login).FirstOrDefault();
            Assert.IsNull(loggedUsr);
            User newUser = db.Users.AddNew(login, GetUserNameFromAD(login));
            Assert.IsNotNull(newUser);
            db.SaveChanges();

        }

        [Test]
        public void A2_GetUser_Success() {

            var loggedUsr = db.Users.ByLogin(login).FirstOrDefault();
            Assert.IsNotNull(loggedUsr);
        }

        [Test]
        public void A3_DeleteUser_Success() {

            var loggedUsr = db.Users.ByLogin(login).FirstOrDefault();
            Assert.IsNotNull(loggedUsr);
            var deleted = db.Users.Delete(loggedUsr.Id);
            db.SaveChanges();

            db.Users.Remove(loggedUsr);
            db.SaveChanges();

        }


    }
    
}
